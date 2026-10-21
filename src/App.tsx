import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { AppHeader } from './components/AppHeader';
import { AudioSheet } from './components/AudioSheet';
import { CardFace } from './components/CardFace';
import { ConfirmDialog } from './components/ConfirmDialog';
import { CountdownBar } from './components/CountdownBar';
import { Controls } from './components/Controls';
import { CountersRow } from './components/CountersRow';
import { HistorySheet } from './components/HistorySheet';
import { HistoryToggle } from './components/HistoryToggle';
import { PapelPicado } from './components/PapelPicado';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PwaInstallBanner } from './components/PwaInstallBanner';
import { SettingsSheet } from './components/SettingsSheet';
import { LOTERIA_CARDS } from './data/cards';
import { FONTS } from './data/fonts';
import { PALETTES } from './data/palettes';
import { SPEEDS } from './data/speeds';
import { useCardAudio } from './hooks/useCardAudio';
import { useDeck } from './hooks/useDeck';
import { usePwaInstallPrompt } from './hooks/usePwaInstallPrompt';
import { usePwaUpdate } from './hooks/usePwaUpdate';
import { useTTS } from './hooks/useTTS';
import { useTweaks } from './hooks/useTweaks';
import { publishAnalyticsContext, publishAppAnalytics, trackEvent, trackOnce } from './lib/analytics';
import { INTRO_AUDIO_KEY, countCardClips } from './lib/cardAudio';
import { makeT } from './lib/i18n';
import type { Card, Tweaks } from './types';

const TIMER_REFRESH_MS = 100;
const FIRST_CALL_INTRO_ES = 'corre y se va corriendo con:';

type CallSource = 'auto' | 'manual' | 'first_auto' | 'first_manual';
type PauseReason = 'button' | 'history' | 'settings' | 'audio' | 'restart';

const TWEAK_CONTEXT_KEY: Record<keyof Tweaks, string> = {
  palette: 'palette',
  font: 'font',
  voice: 'voice',
  verses: 'verses',
  speed: 'speed',
  language: 'ui_language',
  customAudio: 'custom_audio',
};

export function App() {
  const { tweaks, setTweak } = useTweaks();
  const palette = PALETTES[tweaks.palette];
  const fonts = FONTS[tweaks.font];
  const language = tweaks.language;
  const t = makeT(language);

  const { deck, called, current, remaining, total, callNext, resetDeck } = useDeck();
  const { speak, cancel: cancelSpeech, supported: ttsSupported } = useTTS({
    enabled: tweaks.voice,
    language,
  });
  const cardAudio = useCardAudio({ enabled: tweaks.voice && tweaks.customAudio });
  const { play: playClip, stop: stopClip, prime: primeAudio, has: hasClip } = cardAudio;
  const { canInstall: canInstallPwa, showIosHint: showIosInstallHint, installing: installingPwa, install: installPwa } = usePwaInstallPrompt();
  const { supported: canUpdatePwa, updating: updatingPwa, update: updatePwa } = usePwaUpdate();

  const [running, setRunning] = useState(false);
  const [timerNowMs, setTimerNowMs] = useState(() => performance.now());
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAudio, setShowAudio] = useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);
  const [introPending, setIntroPending] = useState(false);
  const lastCallAtRef = useRef(0);
  const pausedAtRef = useRef<number | null>(null);
  const gameStartedAtRef = useRef<number | null>(null);
  const restartWasRunningRef = useRef(false);
  const hasCalledRef = useRef(false);
  const hiddenAtRef = useRef<number | null>(null);
  const speechDelayRef = useRef<number | null>(null);
  const introSequenceRef = useRef(0);

  useEffect(() => {
    hasCalledRef.current = called.length > 0;
  }, [called.length]);

  // Build the TTS string for a card based on current language + verses setting
  const buildText = useCallback(
    (card: Card): string => {
      const name = language === 'es' ? card.es : card.en;
      const verse = language === 'es' ? card.verseEs : card.verseEn;
      return tweaks.verses ? `${name}. ${verse}` : name;
    },
    [language, tweaks.verses]
  );

  // A card's own clip wins over the system voice; everything else falls back.
  const speakCard = useCallback(
    (card: Card) => {
      if (playClip(card.n)) return;
      speak(buildText(card));
    },
    [playClip, speak, buildText]
  );

  const stopVoice = useCallback(() => {
    cancelSpeech();
    stopClip();
  }, [cancelSpeech, stopClip]);

  const clearPendingSpeech = useCallback(() => {
    if (speechDelayRef.current === null) return;
    window.clearTimeout(speechDelayRef.current);
    speechDelayRef.current = null;
  }, []);

  const scheduleSpeech = useCallback(
    (card: Card) => {
      clearPendingSpeech();
      speechDelayRef.current = window.setTimeout(() => {
        speechDelayRef.current = null;
        speakCard(card);
      }, 50);
    },
    [clearPendingSpeech, speakCard]
  );

  const gameElapsed = useCallback((): number => {
    if (gameStartedAtRef.current === null) return 0;
    return Math.max(0, Math.round((performance.now() - gameStartedAtRef.current) / 1000));
  }, []);

  const voiceFor = useCallback((card: Card): 'off' | 'clip' | 'tts' | 'silent' => {
    if (!tweaks.voice) return 'off';
    if (tweaks.customAudio && hasClip(card.n)) return 'clip';
    return ttsSupported ? 'tts' : 'silent';
  }, [hasClip, tweaks.customAudio, tweaks.voice, ttsSupported]);

  // Draw + speak one card; stop running when deck is empty.
  const tick = useCallback((callAtMs = performance.now(), source: CallSource = 'auto'): boolean => {
    const card = callNext();
    if (!card) {
      setRunning(false);
      return false;
    }
    if (gameStartedAtRef.current === null) gameStartedAtRef.current = callAtMs;
    const position = called.length + 1;
    const finished = position >= total;
    const remainingCards = Math.max(0, deck.length - 1);
    lastCallAtRef.current = callAtMs;
    setTimerNowMs(callAtMs);
    scheduleSpeech(card);
    publishAnalyticsContext({
      cards_called: position,
      cards_remaining: remainingCards,
      intro_pending: false,
      game_running: source === 'auto' || source === 'first_auto' || running,
    });
    trackEvent('card_called', {
      card: card.n,
      name: card.icon,
      position,
      remaining: remainingCards,
      source,
      announcer: voiceFor(card),
      finished,
      elapsed_s: gameElapsed(),
    });
    if (finished) {
      trackEvent('game_complete', {
        cards_called: position,
        elapsed_s: gameElapsed(),
        source,
      });
    }
    return true;
  }, [callNext, called.length, deck.length, gameElapsed, running, scheduleSpeech, total, voiceFor]);

  // Keep a stable ref to the latest tick so timer callbacks always see current closure.
  const tickRef = useRef(tick);
  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  const cancelPendingIntro = useCallback((updateState = true) => {
    introSequenceRef.current += 1;
    if (updateState) setIntroPending(false);
  }, []);

  const startFirstCallSequence = useCallback((autoRun: boolean) => {
    if (introPending) return;

    if (gameStartedAtRef.current === null) gameStartedAtRef.current = performance.now();
    trackEvent('game_start', { mode: autoRun ? 'auto' : 'manual' });

    const sequence = introSequenceRef.current + 1;
    introSequenceRef.current = sequence;

    const callFirstCard = () => {
      if (introSequenceRef.current !== sequence) return;

      setIntroPending(false);
      const now = performance.now();
      if (tickRef.current(now, autoRun ? 'first_auto' : 'first_manual') && autoRun) {
        setRunning(true);
      }
    };

    // The spoken intro is a Spanish tradition, but a recorded one is the
    // caller's own voice — play it whatever the language is set to.
    const hasIntroClip = hasClip(INTRO_AUDIO_KEY);
    if (language !== 'es' && !hasIntroClip) {
      trackEvent('intro_skipped', { reason: 'language' });
      callFirstCard();
      return;
    }

    setIntroPending(true);
    publishAnalyticsContext({ intro_pending: true });
    if (playClip(INTRO_AUDIO_KEY, { onEnd: callFirstCard })) {
      trackEvent('intro_played', { via: 'clip' });
      return;
    }
    if (speak(FIRST_CALL_INTRO_ES, { onEnd: callFirstCard })) {
      trackEvent('intro_played', { via: 'tts' });
      return;
    }
    trackEvent('intro_skipped', { reason: 'unavailable' });
    callFirstCard();
  }, [introPending, language, speak, playClip, hasClip]);

  // Auto-mode: pause-aware timer.
  // - First play (no cards yet): draw immediately, then start one clock loop.
  // - Pause: capture pausedAt so the pause duration can later be subtracted
  //   from the running clock; the current card stays unchanged.
  // - Resume: shift lastCallAt forward by the pause duration so the countdown
  //   continues from where it left off instead of restarting or skipping.
  // - Hidden tabs are treated like an implicit pause to avoid stale UI jumps.
  useEffect(() => {
    const now = performance.now();

    if (!running) {
      if (hasCalledRef.current && pausedAtRef.current === null) {
        pausedAtRef.current = now;
      }
      return;
    }

    if (!hasCalledRef.current) {
      tickRef.current(now);
      return;
    } else if (pausedAtRef.current !== null) {
      lastCallAtRef.current += now - pausedAtRef.current;
      pausedAtRef.current = null;
    }

    setTimerNowMs(now);

    const intervalId = window.setInterval(() => {
      const nextNow = performance.now();

      if (document.hidden) {
        if (hiddenAtRef.current === null) {
          hiddenAtRef.current = nextNow;
        }
        return;
      }

      if (hiddenAtRef.current !== null) {
        lastCallAtRef.current += nextNow - hiddenAtRef.current;
        hiddenAtRef.current = null;
      }

      setTimerNowMs(nextNow);
    }, TIMER_REFRESH_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [called.length, running, tweaks.speed]);

  // Advance cards from the same sampled clock value used to render the countdown.
  useEffect(() => {
    if (!running || !hasCalledRef.current || document.hidden) return;

    const intervalMs = SPEEDS[tweaks.speed].seconds * 1000;
    if (timerNowMs - lastCallAtRef.current < intervalMs) return;

    tickRef.current(timerNowMs);
  }, [running, timerNowMs, tweaks.speed]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const now = performance.now();

      if (document.hidden) {
        hiddenAtRef.current = now;
        return;
      }

      if (hiddenAtRef.current !== null) {
        if (running && hasCalledRef.current) {
          lastCallAtRef.current += now - hiddenAtRef.current;
        }
        hiddenAtRef.current = null;
      }

      setTimerNowMs(now);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [running]);

  // Cancel any in-flight speech when component unmounts.
  useEffect(
    () => () => {
      cancelPendingIntro(false);
      clearPendingSpeech();
      stopVoice();
    },
    [cancelPendingIntro, stopVoice, clearPendingSpeech]
  );

  const gameFacts = useCallback(() => ({
    cards_called: called.length,
    elapsed_s: gameElapsed(),
  }), [called.length, gameElapsed]);

  const pauseFor = useCallback((reason: PauseReason) => {
    if (!running) return;
    publishAnalyticsContext({ game_running: false });
    trackEvent('game_pause', { reason, ...gameFacts() });
  }, [gameFacts, running]);

  const cancelIntroFor = useCallback((reason: string) => {
    if (introPending) trackEvent('intro_cancelled', { reason });
    cancelPendingIntro();
  }, [cancelPendingIntro, introPending]);

  // Handlers
  const handleRequestRestart = useCallback(() => {
    if (called.length === 0) return;
    restartWasRunningRef.current = running;
    cancelIntroFor('restart');
    pauseFor('restart');
    setRunning(false);
    trackEvent('dialog_open', { dialog: 'restart', ...gameFacts() });
    setShowRestartConfirm(true);
  }, [called.length, cancelIntroFor, gameFacts, pauseFor, running]);

  const handleCancelRestart = useCallback(() => {
    trackEvent('dialog_close', { dialog: 'restart', result: 'cancel' });
    setShowRestartConfirm(false);
  }, []);

  const handleConfirmRestart = useCallback(() => {
    trackEvent('game_restart', {
      ...gameFacts(),
      was_running: restartWasRunningRef.current,
    });
    if (showHistory) trackEvent('sheet_close', { screen: 'history' });
    if (showSettings) trackEvent('sheet_close', { screen: 'settings' });
    const now = performance.now();
    cancelPendingIntro();
    clearPendingSpeech();
    stopVoice();
    resetDeck();
    lastCallAtRef.current = 0;
    pausedAtRef.current = null;
    gameStartedAtRef.current = null;
    hasCalledRef.current = false;
    hiddenAtRef.current = null;
    setTimerNowMs(now);
    setRunning(false);
    setShowHistory(false);
    setShowSettings(false);
    setShowRestartConfirm(false);
  }, [cancelPendingIntro, stopVoice, clearPendingSpeech, gameFacts, resetDeck, showHistory, showSettings]);

  const handleTogglePlay = () => {
    if (introPending) return;
    // Unlock clip playback while we are still inside the user's tap.
    primeAudio();
    if (deck.length === 0 && called.length > 0) {
      handleRequestRestart();
      return;
    }
    if (!running && called.length === 0) {
      startFirstCallSequence(true);
      return;
    }
    publishAnalyticsContext({ game_running: !running });
    trackEvent(running ? 'game_pause' : 'game_resume', { reason: 'button', ...gameFacts() });
    setRunning(r => !r);
  };

  const handleNext = () => {
    if (introPending) return;
    primeAudio();
    if (deck.length === 0) return;
    if (called.length === 0) {
      startFirstCallSequence(false);
      return;
    }
    const now = performance.now();
    if (!tick(now, 'manual')) return;
    // If we're paused, the just-drawn card resets the countdown — the pause
    // duration before this click shouldn't count toward the new card's timer.
    if (pausedAtRef.current !== null) {
      pausedAtRef.current = now;
    }
  };

  const handleOpenHistory = () => {
    cancelIntroFor('history');
    pauseFor('history');
    stopVoice();
    setRunning(false);
    setShowHistory(true);
    trackEvent('sheet_open', { screen: 'history', from: 'board', ...gameFacts() });
  };

  const handleOpenSettings = () => {
    cancelIntroFor('settings');
    pauseFor('settings');
    stopVoice();
    setRunning(false);
    setShowSettings(true);
    trackEvent('sheet_open', { screen: 'settings', from: 'header', ...gameFacts() });
  };

  const handleOpenAudio = (from: 'header' | 'settings') => {
    cancelIntroFor('audio');
    pauseFor('audio');
    stopVoice();
    setRunning(false);
    if (showSettings) trackEvent('sheet_close', { screen: 'settings' });
    setShowSettings(false);
    setShowAudio(true);
    trackEvent('sheet_open', { screen: 'audio', from, ...gameFacts() });
  };

  // Preview with the system voice, for rows that have no clip of their own.
  const handlePreviewVoice = useCallback(
    (key: number) => {
      if (key === INTRO_AUDIO_KEY) {
        speak(FIRST_CALL_INTRO_ES, { force: true });
        return;
      }
      const card = LOTERIA_CARDS.find(c => c.n === key);
      if (card) speak(buildText(card), { force: true });
    },
    [speak, buildText]
  );

  const setTrackedTweak = <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => {
    if (tweaks[key] === value) return;
    publishAnalyticsContext({ [TWEAK_CONTEXT_KEY[key]]: value });
    setTweak(key, value);
    trackEvent('setting_change', { setting: key, value });
  };

  const handleToggleLanguage = () => {
    setTrackedTweak('language', language === 'es' ? 'en' : 'es');
  };

  // Derived: countdown + primary control mode
  const intervalMs = SPEEDS[tweaks.speed].seconds * 1000;
  const elapsedMs = Math.max(0, timerNowMs - lastCallAtRef.current);
  const secondsLeft = running
    ? Math.max(0, Math.ceil((intervalMs - elapsedMs) / 1000))
    : SPEEDS[tweaks.speed].seconds;
  const progressPct = running ? Math.min(100, Math.max(0, (elapsedMs / intervalMs) * 100)) : 0;

  const cardsWithClips = countCardClips(cardAudio.clips, LOTERIA_CARDS);
  const storedClipCount = Object.keys(cardAudio.clips).length;

  useEffect(() => {
    publishAppAnalytics({
      tweaks,
      tts: ttsSupported,
      audioStorage: cardAudio.supported,
      cardsCalled: called.length,
      cardsRemaining: remaining,
      gameRunning: running,
      introPending,
      clipCount: storedClipCount,
      cardsWithAudio: cardsWithClips,
      hasIntro: hasClip(INTRO_AUDIO_KEY),
    });
  }, [
    called.length,
    cardAudio.supported,
    cardsWithClips,
    hasClip,
    introPending,
    remaining,
    running,
    storedClipCount,
    tweaks,
    ttsSupported,
  ]);

  useEffect(() => {
    if (!cardAudio.ready) return;
    trackOnce('app_open', {
      clip_count: storedClipCount,
      cards_with_audio: cardsWithClips,
      has_intro: hasClip(INTRO_AUDIO_KEY),
    });
  }, [cardAudio.ready, cardsWithClips, hasClip, storedClipCount]);

  useEffect(() => {
    if (canInstallPwa) trackOnce('pwa_install_available');
  }, [canInstallPwa]);

  useEffect(() => {
    if (showIosInstallHint) trackOnce('pwa_ios_hint');
  }, [showIosInstallHint]);

  useEffect(() => {
    if (canUpdatePwa) trackOnce('pwa_update_available');
  }, [canUpdatePwa]);

  const requestInstall = (source: 'banner' | 'settings') => {
    trackEvent('pwa_install_prompt', { source });
    return installPwa().then(outcome => {
      trackEvent('pwa_install_result', { source, outcome });
      return outcome;
    });
  };

  const primaryMode: 'call' | 'pause' | 'resume' | 'restart' =
    deck.length === 0 && called.length > 0
      ? 'restart'
      : running
        ? 'pause'
        : called.length === 0
          ? 'call'
          : 'resume';

  // Screen-reader live-region content
  const liveText = current
    ? tweaks.verses
      ? `${language === 'es' ? current.es : current.en}. ${language === 'es' ? current.verseEs : current.verseEn}`
      : language === 'es' ? current.es : current.en
    : '';

  const rootStyle: CSSProperties = {
    '--bg': palette.bg,
    '--paper': palette.paper,
    '--ink': palette.ink,
    '--ink-soft': palette.inkSoft,
    '--accent': palette.accent,
    '--accent2': palette.accent2,
    '--accent3': palette.accent3,
    '--accent4': palette.accent4,
    '--grain': palette.grain,
    '--font-head': fonts.head,
    '--font-body': fonts.body,
  } as CSSProperties;

  return (
    <div className="app-root" style={rootStyle}>
      <div className="visually-hidden" aria-live="polite" aria-atomic="true">
        {liveText}
      </div>

      <PapelPicado color={palette.bg} count={7} />

      <OfflineIndicator
        fonts={fonts}
        offlineLabel={t('Sin conexión', 'Offline')}
        onlineLabel={t('En línea', 'Online')}
      />

      <AppHeader
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onOpenAudio={() => handleOpenAudio('header')}
        onOpenSettings={handleOpenSettings}
        fonts={fonts}
        brandSub={t('El cantor', 'The Caller')}
        langButtonLabel={t('Cambiar idioma', 'Toggle language')}
        audioButtonLabel={t('Mis audios', 'My audio')}
        audioClipCount={storedClipCount}
        settingsButtonLabel={t('Ajustes', 'Settings')}
      />

      <PwaInstallBanner
        fonts={fonts}
        message={t('Se puede instalar como PWA', 'This app can be installed as a PWA')}
        installLabel={t('Instalar', 'Install')}
        dismissLabel={t('Descartar aviso de instalación', 'Dismiss install notice')}
        canInstall={canInstallPwa}
        installing={installingPwa}
        onInstall={() => requestInstall('banner')}
      />

      <main className="app-main" aria-label={t('Cantor de Lotería', 'Lotería Caller')}>
        <CountersRow
          called={called.length}
          remaining={remaining}
          total={total}
          labels={{
            called: t('Cantadas', 'Called'),
            remaining: t('Restan', 'Left'),
            total: t('Mazo', 'Deck'),
          }}
          palette={palette}
          fonts={fonts}
        />

        <CardFace
          card={current}
          language={language}
          showVerse={tweaks.verses}
          palette={palette}
          fonts={fonts}
          emptyLabel={
            introPending
              ? t('corre y se va corriendo con', 'here it comes')
              : t('Listo para cantar', 'Ready to call')
          }
        />

        <CountdownBar
          visible={running}
          cycleKey={current?.n}
          progressPct={progressPct}
          secondsLeft={secondsLeft}
          palette={palette}
          fonts={fonts}
          label={t('Siguiente en', 'Next in')}
        />

        <Controls
          primaryMode={primaryMode}
          canRestart={called.length > 0}
          canNext={deck.length > 0}
          disablePrimary={introPending}
          onRestart={handleRequestRestart}
          onTogglePlay={handleTogglePlay}
          onNext={handleNext}
          palette={palette}
          fonts={fonts}
          labels={{
            next: t('Siguiente', 'Next'),
            call: t('CANTAR', 'CALL'),
            pause: t('PAUSAR', 'PAUSE'),
            resume: t('SEGUIR', 'RESUME'),
            restart: t('Reiniciar', 'Restart'),
          }}
        />

        <HistoryToggle
          count={called.length}
          onClick={handleOpenHistory}
          label={t('Ver historial', 'View history')}
          palette={palette}
          fonts={fonts}
        />
      </main>

      <HistorySheet
        open={showHistory}
        onClose={() => {
          trackEvent('sheet_close', { screen: 'history' });
          setShowHistory(false);
        }}
        called={called}
        language={language}
        palette={palette}
        fonts={fonts}
        onPillClick={card => {
          trackEvent('history_replay', { card: card.n, name: card.icon });
          speakCard(card);
        }}
        title={t('Historial', 'History')}
        closeLabel={t('Cerrar', 'Close')}
        emptyLabel={t('Aún no se ha cantado ninguna carta', 'No cards called yet')}
      />

      <SettingsSheet
        open={showSettings}
        onClose={() => {
          trackEvent('sheet_close', { screen: 'settings' });
          setShowSettings(false);
        }}
        tweaks={tweaks}
        setTweak={setTrackedTweak}
        onResetDeck={handleRequestRestart}
        canResetDeck={called.length > 0}
        onOpenAudio={() => handleOpenAudio('settings')}
        canInstallPwa={canInstallPwa}
        installingPwa={installingPwa}
        onInstallPwa={() => { void requestInstall('settings'); }}
        showIosInstallHint={showIosInstallHint}
        canUpdatePwa={canUpdatePwa}
        updatingPwa={updatingPwa}
        onUpdatePwa={() => {
          trackEvent('pwa_update');
          void updatePwa();
        }}
        palette={palette}
        fonts={fonts}
        ttsSupported={ttsSupported}
        labels={{
          title: t('Ajustes', 'Settings'),
          close: t('Cerrar', 'Close'),
          voice: t('Voz', 'Voice'),
          voiceDesc: t('Anuncia las cartas en voz alta', 'Read cards aloud'),
          voiceUnsupported: t(
            'Tu navegador no soporta voz',
            'Your browser does not support speech'
          ),
          verses: t('Versos', 'Verses'),
          versesDesc: t(
            'Mostrar y leer los versos tradicionales',
            'Show and read traditional verses'
          ),
          customAudio: t('Mis audios', 'My audio'),
          customAudioDesc: cardsWithClips > 0
            ? t(
                `${cardsWithClips} de ${LOTERIA_CARDS.length} cartas con voz propia`,
                `${cardsWithClips} of ${LOTERIA_CARDS.length} cards with your own voice`
              )
            : t('Graba o sube tu voz por carta', 'Record or upload your voice per card'),
          customAudioButton: t('Gestionar', 'Manage'),
          speed: t('Velocidad', 'Speed'),
          language: t('Idioma', 'Language'),
          installApp: t('Instalar app', 'Install app'),
          installAppDesc: t('(para uso offline)', '(for offline use)'),
          installAppButton: t('Instalar', 'Install'),
          iosInstallHint: t(
            'Toca Compartir y luego «Añadir a la pantalla de inicio»',
            'Tap Share, then "Add to Home Screen"'
          ),
          updateApp: t('Actualizar app', 'Update app'),
          updateAppDesc: t('Obtener la última versión', 'Get the latest version'),
          updateAppButton: t('Actualizar', 'Update'),
          updateAppUpdating: t('Actualizando…', 'Updating…'),
          resetDeck: t('Reiniciar mazo', 'Reset deck'),
          about: t('Acerca de', 'About'),
          aboutDesc: t('Lotería — El Cantor', 'Lotería — The Caller'),
          // Feminine: the copy calls the app "la app".
          madeBy: t('Hecha por', 'Made by'),
          opensInNewTab: t('(se abre en una pestaña nueva)', '(opens in a new tab)'),
        }}
      />

      <AudioSheet
        open={showAudio}
        onClose={() => {
          trackEvent('sheet_close', { screen: 'audio' });
          setShowAudio(false);
        }}
        audio={cardAudio}
        language={language}
        useCustom={tweaks.customAudio}
        onToggleUseCustom={value => setTrackedTweak('customAudio', value)}
        voiceOn={tweaks.voice && ttsSupported}
        onPreviewVoice={handlePreviewVoice}
        palette={palette}
        fonts={fonts}
      />

      <ConfirmDialog
        open={showRestartConfirm}
        title={t('¿Reiniciar mazo?', 'Restart deck?')}
        message={t(
          'Se borrará el historial y se barajará un mazo nuevo.',
          'This clears the history and shuffles a new deck.'
        )}
        confirmLabel={t('Reiniciar', 'Restart')}
        cancelLabel={t('Cancelar', 'Cancel')}
        onConfirm={handleConfirmRestart}
        onCancel={handleCancelRestart}
        palette={palette}
        fonts={fonts}
      />
    </div>
  );
}

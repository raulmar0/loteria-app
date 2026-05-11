import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { AppHeader } from './components/AppHeader';
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
import { FONTS } from './data/fonts';
import { PALETTES } from './data/palettes';
import { SPEEDS } from './data/speeds';
import { useDeck } from './hooks/useDeck';
import { useTTS } from './hooks/useTTS';
import { useTweaks } from './hooks/useTweaks';
import { makeT } from './lib/i18n';
import type { Card } from './types';

const TIMER_REFRESH_MS = 100;
const FIRST_CALL_INTRO_ES = 'corre y se va corriendo con:';

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

  const [running, setRunning] = useState(false);
  const [timerNowMs, setTimerNowMs] = useState(() => performance.now());
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);
  const [introPending, setIntroPending] = useState(false);
  const lastCallAtRef = useRef(0);
  const pausedAtRef = useRef<number | null>(null);
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

  const speakCard = useCallback(
    (card: Card) => {
      speak(buildText(card));
    },
    [speak, buildText]
  );

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

  // Draw + speak one card; stop running when deck is empty.
  const tick = useCallback((callAtMs = performance.now()): boolean => {
    const card = callNext();
    if (!card) {
      setRunning(false);
      return false;
    }
    lastCallAtRef.current = callAtMs;
    setTimerNowMs(callAtMs);
    scheduleSpeech(card);
    return true;
  }, [callNext, scheduleSpeech]);

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

    const sequence = introSequenceRef.current + 1;
    introSequenceRef.current = sequence;

    const callFirstCard = () => {
      if (introSequenceRef.current !== sequence) return;

      setIntroPending(false);
      const now = performance.now();
      if (tickRef.current(now) && autoRun) {
        setRunning(true);
      }
    };

    if (language !== 'es') {
      callFirstCard();
      return;
    }

    setIntroPending(true);
    const didSpeakIntro = speak(FIRST_CALL_INTRO_ES, {
      onEnd: callFirstCard,
    });

    if (!didSpeakIntro) {
      callFirstCard();
    }
  }, [introPending, language, speak]);

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
      cancelSpeech();
    },
    [cancelPendingIntro, cancelSpeech, clearPendingSpeech]
  );

  // Handlers
  const handleRequestRestart = useCallback(() => {
    if (called.length === 0) return;
    cancelPendingIntro();
    setRunning(false);
    setShowRestartConfirm(true);
  }, [called.length, cancelPendingIntro]);

  const handleCancelRestart = useCallback(() => {
    setShowRestartConfirm(false);
  }, []);

  const handleConfirmRestart = useCallback(() => {
    const now = performance.now();
    cancelPendingIntro();
    clearPendingSpeech();
    cancelSpeech();
    resetDeck();
    lastCallAtRef.current = 0;
    pausedAtRef.current = null;
    hasCalledRef.current = false;
    hiddenAtRef.current = null;
    setTimerNowMs(now);
    setRunning(false);
    setShowHistory(false);
    setShowSettings(false);
    setShowRestartConfirm(false);
  }, [cancelPendingIntro, cancelSpeech, clearPendingSpeech, resetDeck]);

  const handleTogglePlay = () => {
    if (introPending) return;
    if (deck.length === 0 && called.length > 0) {
      handleRequestRestart();
      return;
    }
    if (!running && called.length === 0) {
      startFirstCallSequence(true);
      return;
    }
    setRunning(r => !r);
  };

  const handleNext = () => {
    if (introPending) return;
    if (deck.length === 0) return;
    if (called.length === 0) {
      startFirstCallSequence(false);
      return;
    }
    const now = performance.now();
    if (!tick(now)) return;
    // If we're paused, the just-drawn card resets the countdown — the pause
    // duration before this click shouldn't count toward the new card's timer.
    if (pausedAtRef.current !== null) {
      pausedAtRef.current = now;
    }
  };

  const handleOpenHistory = () => {
    cancelPendingIntro();
    cancelSpeech();
    setRunning(false);
    setShowHistory(true);
  };

  const handleOpenSettings = () => {
    cancelPendingIntro();
    cancelSpeech();
    setRunning(false);
    setShowSettings(true);
  };

  const handleToggleLanguage = () => {
    setTweak('language', language === 'es' ? 'en' : 'es');
  };

  // Derived: countdown + primary control mode
  const intervalMs = SPEEDS[tweaks.speed].seconds * 1000;
  const elapsedMs = Math.max(0, timerNowMs - lastCallAtRef.current);
  const secondsLeft = running
    ? Math.max(0, Math.ceil((intervalMs - elapsedMs) / 1000))
    : SPEEDS[tweaks.speed].seconds;
  const progressPct = running ? Math.min(100, Math.max(0, (elapsedMs / intervalMs) * 100)) : 0;

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
        onOpenSettings={handleOpenSettings}
        fonts={fonts}
        brandSub={t('El cantor', 'The Caller')}
        langButtonLabel={t('Cambiar idioma', 'Toggle language')}
        settingsButtonLabel={t('Ajustes', 'Settings')}
      />

      <PwaInstallBanner
        fonts={fonts}
        message={t('Se puede instalar como PWA', 'This app can be installed as a PWA')}
        installLabel={t('Instalar', 'Install')}
        dismissLabel={t('Descartar aviso de instalación', 'Dismiss install notice')}
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
          emptyLabel={t('Listo para cantar', 'Ready to call')}
        />

        {running && (
          <CountdownBar
            progressPct={progressPct}
            secondsLeft={secondsLeft}
            palette={palette}
            fonts={fonts}
            label={t('Siguiente en', 'Next in')}
          />
        )}

        <Controls
          primaryMode={primaryMode}
          canRestart={called.length > 0}
          canNext={deck.length > 0}
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
        onClose={() => setShowHistory(false)}
        called={called}
        language={language}
        palette={palette}
        fonts={fonts}
        onPillClick={card => speakCard(card)}
        title={t('Historial', 'History')}
        closeLabel={t('Cerrar', 'Close')}
        emptyLabel={t('Aún no se ha cantado ninguna carta', 'No cards called yet')}
      />

      <SettingsSheet
        open={showSettings}
        onClose={() => setShowSettings(false)}
        tweaks={tweaks}
        setTweak={setTweak}
        onResetDeck={handleRequestRestart}
        canResetDeck={called.length > 0}
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
          speed: t('Velocidad', 'Speed'),
          language: t('Idioma', 'Language'),
          resetDeck: t('Reiniciar mazo', 'Reset deck'),
        }}
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

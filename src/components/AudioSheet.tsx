import { useCallback, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { AudioRow, type AudioRowLabels, type AudioRowState } from './AudioRow';
import { BottomSheet } from './BottomSheet';
import { Segmented } from './Segmented';
import { Switch } from './Switch';
import { LOTERIA_CARDS } from '../data/cards';
import {
  INTRO_AUDIO_KEY,
  MAX_CLIP_BYTES,
  MAX_RECORD_MS,
  countCardClips,
  filterCards,
  formatBytes,
  totalClipBytes,
  validateAudioFile,
  type AudioFilter,
  type CardAudioError,
} from '../lib/cardAudio';
import { makeT } from '../lib/i18n';
import type { UseCardAudioResult } from '../hooks/useCardAudio';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import type { FontPair, Language, Palette } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  audio: UseCardAudioResult;
  language: Language;
  /** The `customAudio` tweak: whether clips replace the voice while calling. */
  useCustom: boolean;
  onToggleUseCustom: (next: boolean) => void;
  /** The master voice switch — clips stay silent while it is off. */
  voiceOn: boolean;
  /** Speaks a card (or the intro line) with the system voice. */
  onPreviewVoice: (key: number) => void;
  palette: Palette;
  fonts: FontPair;
}

export function AudioSheet({
  open,
  onClose,
  audio,
  language,
  useCustom,
  onToggleUseCustom,
  voiceOn,
  onPreviewVoice,
  palette,
  fonts,
}: Props) {
  const t = makeT(language);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<AudioFilter>('all');
  const [confirmKey, setConfirmKey] = useState<number | null>(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);
  const [busyKey, setBusyKey] = useState<number | null>(null);
  const [error, setError] = useState<CardAudioError | null>(null);
  // Last row the user touched: stays listed even when the filter drops it.
  const [keepKey, setKeepKey] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uploadKeyRef = useRef<number>(INTRO_AUDIO_KEY);

  const { clips, save, remove, clearAll, play, stop, prime, playingKey, supported: canStore } = audio;

  const handleRecorded = useCallback(
    (key: number, blob: Blob, durationMs: number) => {
      setBusyKey(key);
      void save(key, blob, { source: 'recording', name: '', durationMs })
        .then(err => setError(err))
        .finally(() => setBusyKey(null));
    },
    [save]
  );

  const recorder = useAudioRecorder({ onComplete: handleRecorded });
  const activeError = error ?? recorder.error;

  const dismissError = useCallback(() => {
    setError(null);
    recorder.clearError();
  }, [recorder]);

  const visibleCards = useMemo(
    () => filterCards(LOTERIA_CARDS, { query, filter, clips, keep: keepKey }),
    [query, filter, clips, keepKey]
  );

  const withClips = countCardClips(clips, LOTERIA_CARDS);
  const introClip = clips[INTRO_AUDIO_KEY];
  const storedCount = withClips + (introClip ? 1 : 0);
  const progressPct = (withClips / LOTERIA_CARDS.length) * 100;

  const handlePlay = useCallback(
    (key: number) => {
      dismissError();
      prime();
      setConfirmKey(null);
      if (!play(key, { force: true })) onPreviewVoice(key);
    },
    [dismissError, onPreviewVoice, play, prime]
  );

  const handleStartRecord = useCallback(
    (key: number) => {
      dismissError();
      stop();
      setConfirmKey(null);
      setKeepKey(key);
      recorder.start(key);
    },
    [dismissError, recorder, stop]
  );

  const handleUploadClick = useCallback(
    (key: number) => {
      dismissError();
      // Replacing a clip revokes its URL, so never leave it playing.
      stop();
      setConfirmKey(null);
      uploadKeyRef.current = key;
      fileInputRef.current?.click();
    },
    [dismissError, stop]
  );

  const handleFileChosen = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const input = event.currentTarget;
      const file = input.files?.[0];
      // Reset right away so picking the same file twice still fires a change.
      input.value = '';
      if (!file) return;

      const key = uploadKeyRef.current;
      const invalid = validateAudioFile(file);
      if (invalid) {
        setError(invalid);
        return;
      }

      setKeepKey(key);
      setBusyKey(key);
      void save(key, file, { source: 'file', name: file.name, durationMs: 0 })
        .then(err => setError(err))
        .finally(() => setBusyKey(null));
    },
    [save]
  );

  const handleDelete = useCallback(
    (key: number) => {
      setConfirmKey(null);
      setKeepKey(key);
      setBusyKey(key);
      void remove(key)
        .then(err => setError(err))
        .finally(() => setBusyKey(null));
    },
    [remove]
  );

  const handleClearAll = useCallback(() => {
    setConfirmClearAll(false);
    setConfirmKey(null);
    setKeepKey(null);
    void clearAll().then(err => setError(err));
  }, [clearAll]);

  const handleClose = useCallback(() => {
    recorder.cancel();
    stop();
    setConfirmKey(null);
    setConfirmClearAll(false);
    onClose();
  }, [onClose, recorder, stop]);

  const rowLabels: AudioRowLabels = {
    play: t('Escuchar', 'Play'),
    stop: t('Detener', 'Stop'),
    record: t('Grabar', 'Record'),
    saveRecording: t('Guardar grabación', 'Save recording'),
    discardRecording: t('Descartar grabación', 'Discard recording'),
    upload: t('Subir archivo', 'Upload file'),
    delete: t('Borrar audio', 'Delete audio'),
    deleteQuestion: t('¿Borrar?', 'Delete?'),
    yes: t('Sí, borrar', 'Yes, delete'),
    no: t('No, dejarlo', 'No, keep it'),
    recording: t('Grabando', 'Recording'),
    systemVoice: t('Voz del teléfono', 'Phone voice'),
    sourceRecording: t('Mi voz', 'My voice'),
    sourceFile: t('Archivo', 'File'),
  };

  const errorMessages: Record<CardAudioError, string> = {
    unsupported: t('Este navegador no puede guardar audios.', "This browser can't store audio."),
    'not-audio': t('Ese archivo no es de audio.', 'That file is not audio.'),
    'too-large': t(
      `El archivo pesa más de ${formatBytes(MAX_CLIP_BYTES)}.`,
      `The file is larger than ${formatBytes(MAX_CLIP_BYTES)}.`
    ),
    quota: t('No queda espacio para guardar el audio.', 'No storage space left for this clip.'),
    failed: t('No se pudo guardar el audio.', "The clip couldn't be saved."),
    'mic-denied': t('No hay permiso para usar el micrófono.', 'Microphone permission was denied.'),
    'mic-insecure': t(
      'Para grabar hace falta una conexión segura (HTTPS).',
      'Recording needs a secure (HTTPS) connection.',
    ),
    'mic-failed': t('No se pudo usar el micrófono.', "The microphone couldn't be used."),
  };

  const rowState = (key: number): AudioRowState =>
    recorder.recordingKey === key ? 'recording' : confirmKey === key ? 'confirm-delete' : 'idle';

  const rowHandlers = (key: number) => ({
    onPlay: () => handlePlay(key),
    onStopPlay: stop,
    onStartRecord: () => handleStartRecord(key),
    onSaveRecording: recorder.stop,
    onDiscardRecording: recorder.cancel,
    onUpload: () => handleUploadClick(key),
    onAskDelete: () => setConfirmKey(key),
    onConfirmDelete: () => handleDelete(key),
    onCancelDelete: () => setConfirmKey(null),
  });

  return (
    <BottomSheet
      open={open}
      onClose={handleClose}
      title={t('Mis audios', 'My audio')}
      titleFont={fonts.head}
      closeLabel={t('Cerrar', 'Close')}
      size="tall"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        className="visually-hidden"
        onChange={handleFileChosen}
        tabIndex={-1}
        aria-hidden="true"
      />

      <div className="setting-row">
        <div className="setting-info">
          <div className="setting-label" style={{ fontFamily: fonts.head }}>
            {t('Usar mis audios', 'Use my audio')}
          </div>
          <div className="setting-desc" style={{ fontFamily: fonts.body }}>
            {t(
              'Si una carta tiene audio propio, suena en lugar de la voz del teléfono.',
              'When a card has its own clip, it plays instead of the phone voice.'
            )}
          </div>
        </div>
        <Switch
          checked={useCustom && canStore}
          onChange={onToggleUseCustom}
          onColor={palette.accent2}
          label={t('Usar mis audios', 'Use my audio')}
        />
      </div>

      <div className="audio-summary">
        <div className="audio-summary-head">
          <div className="audio-summary-count" style={{ fontFamily: fonts.head }}>
            {withClips}
            <span className="audio-summary-total">/{LOTERIA_CARDS.length}</span>
          </div>
          <div className="audio-summary-text" style={{ fontFamily: fonts.body }}>
            <div>{t('cartas con audio propio', 'cards with their own audio')}</div>
            <div className="audio-summary-sub">
              {storedCount === 0
                ? t('todavía nada grabado', 'nothing recorded yet')
                : `${introClip ? t('intro incluida · ', 'intro included · ') : ''}${formatBytes(totalClipBytes(clips))}`}
            </div>
          </div>
          {storedCount > 0 && !confirmClearAll && (
            <button
              type="button"
              className="audio-link-btn"
              style={{ fontFamily: fonts.body, color: palette.accent }}
              onClick={() => setConfirmClearAll(true)}
            >
              {t('Borrar todos', 'Delete all')}
            </button>
          )}
        </div>

        <div className="audio-progress" aria-hidden="true">
          <div className="audio-progress-fill" style={{ width: `${progressPct}%`, background: palette.accent2 }} />
        </div>

        {confirmClearAll && (
          <div className="audio-inline-confirm" style={{ fontFamily: fonts.body }}>
            <span>
              {t(
                `¿Borrar los ${storedCount} audios guardados?`,
                `Delete all ${storedCount} saved clips?`
              )}
            </span>
            <div className="audio-inline-actions">
              <button
                type="button"
                className="audio-mini-btn danger"
                style={{ fontFamily: fonts.head, background: palette.accent }}
                onClick={handleClearAll}
              >
                {t('Borrar', 'Delete')}
              </button>
              <button
                type="button"
                className="audio-mini-btn"
                style={{ fontFamily: fonts.head }}
                onClick={() => setConfirmClearAll(false)}
              >
                {t('Cancelar', 'Cancel')}
              </button>
            </div>
          </div>
        )}
      </div>

      {activeError && (
        <div className="audio-note error" role="alert" style={{ fontFamily: fonts.body }}>
          <span>{errorMessages[activeError]}</span>
          <button
            type="button"
            className="audio-note-close"
            onClick={dismissError}
            aria-label={t('Descartar aviso', 'Dismiss notice')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          </button>
        </div>
      )}

      {!canStore && (
        <div className="audio-note" style={{ fontFamily: fonts.body }}>
          {t(
            'Este navegador no puede guardar audios propios.',
            "This browser can't store custom audio."
          )}
        </div>
      )}

      {canStore && !voiceOn && (
        <div className="audio-note" style={{ fontFamily: fonts.body }}>
          {t(
            'La voz está apagada en Ajustes, así que al cantar no sonará nada.',
            'Voice is off in Settings, so nothing will play while calling.'
          )}
        </div>
      )}

      <div className="audio-group">
        <div className="audio-group-title" style={{ fontFamily: fonts.body }}>
          {t('Intro', 'Intro')}
        </div>
        <ul className="audio-list">
          <AudioRow
            badge="♪"
            name={t('Intro del cantor', 'Caller intro')}
            hint={t('«corre y se va corriendo con…»', '"corre y se va corriendo con…"')}
            color={palette.accent3}
            clip={introClip}
            state={rowState(INTRO_AUDIO_KEY)}
            elapsedMs={recorder.elapsedMs}
            playing={playingKey === INTRO_AUDIO_KEY}
            busy={busyKey === INTRO_AUDIO_KEY}
            canRecord={recorder.recordingKey === null && canStore}
            canStore={canStore}
            fonts={fonts}
            labels={rowLabels}
            {...rowHandlers(INTRO_AUDIO_KEY)}
          />
        </ul>
      </div>

      <div className="audio-group">
        <div className="audio-toolbar">
          <input
            className="audio-search"
            type="search"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setKeepKey(null);
            }}
            placeholder={t('Buscar carta…', 'Search card…')}
            aria-label={t('Buscar carta', 'Search card')}
            style={{ fontFamily: fonts.body }}
          />
          <Segmented<AudioFilter>
            ariaLabel={t('Filtrar cartas', 'Filter cards')}
            value={filter}
            options={[
              { value: 'all', label: t('Todas', 'All') },
              { value: 'custom', label: t('Con audio', 'With audio') },
              { value: 'default', label: t('Sin audio', 'Without') },
            ]}
            onChange={value => {
              // Re-querying the list is deliberate: drop the pinned row.
              setFilter(value);
              setKeepKey(null);
            }}
            fontBody={fonts.body}
          />
        </div>

        {visibleCards.length === 0 ? (
          <div className="empty-state" style={{ fontFamily: fonts.body }}>
            {t('Ninguna carta coincide', 'No cards match')}
          </div>
        ) : (
          <ul className="audio-list">
            {visibleCards.map(card => (
              <AudioRow
                key={card.n}
                badge={String(card.n).padStart(2, '0')}
                name={language === 'es' ? card.es : card.en}
                color={card.color}
                clip={clips[card.n]}
                state={rowState(card.n)}
                elapsedMs={recorder.elapsedMs}
                playing={playingKey === card.n}
                busy={busyKey === card.n}
                canRecord={recorder.recordingKey === null && canStore}
                canStore={canStore}
                fonts={fonts}
                labels={rowLabels}
                {...rowHandlers(card.n)}
              />
            ))}
          </ul>
        )}
      </div>

      <p className="audio-footnote" style={{ fontFamily: fonts.body }}>
        {t(
          `Graba hasta ${Math.round(MAX_RECORD_MS / 1000)} s por carta o sube un archivo de audio. Todo se guarda en este dispositivo.`,
          `Record up to ${Math.round(MAX_RECORD_MS / 1000)}s per card or upload an audio file. Everything stays on this device.`
        )}
      </p>
    </BottomSheet>
  );
}

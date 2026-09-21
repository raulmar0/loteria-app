import type { CSSProperties } from 'react';
import { formatBytes, formatClipDuration } from '../lib/cardAudio';
import { readableTextOn } from '../lib/colorContrast';
import type { CardAudioMeta, FontPair } from '../types';

export type AudioRowState = 'idle' | 'recording' | 'confirm-delete';

export interface AudioRowLabels {
  play: string;
  stop: string;
  record: string;
  saveRecording: string;
  discardRecording: string;
  upload: string;
  delete: string;
  deleteQuestion: string;
  yes: string;
  no: string;
  recording: string;
  systemVoice: string;
  sourceRecording: string;
  sourceFile: string;
}

interface Props {
  badge: string;
  name: string;
  /** Small line under the name; used for the intro phrase. */
  hint?: string;
  color: string;
  clip: CardAudioMeta | undefined;
  state: AudioRowState;
  elapsedMs: number;
  playing: boolean;
  busy: boolean;
  canRecord: boolean;
  canStore: boolean;
  fonts: FontPair;
  labels: AudioRowLabels;
  onPlay: () => void;
  onStopPlay: () => void;
  onStartRecord: () => void;
  onSaveRecording: () => void;
  onDiscardRecording: () => void;
  onUpload: () => void;
  onAskDelete: () => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}

const ICON = {
  play: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="7 4 20 12 7 20" />
    </svg>
  ),
  stop: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  ),
  mic: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 11v1a7 7 0 0 0 14 0v-1" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  ),
  upload: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20V8" />
      <path d="m7 13 5-5 5 5" />
      <path d="M5 4h14" />
    </svg>
  ),
  trash: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="m6 7 1 13h10l1-13" />
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  close: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="6" y1="18" x2="18" y2="6" />
    </svg>
  ),
};

export function AudioRow({
  badge,
  name,
  hint,
  color,
  clip,
  state,
  elapsedMs,
  playing,
  busy,
  canRecord,
  canStore,
  fonts,
  labels,
  onPlay,
  onStopPlay,
  onStartRecord,
  onSaveRecording,
  onDiscardRecording,
  onUpload,
  onAskDelete,
  onConfirmDelete,
  onCancelDelete,
}: Props) {
  const recording = state === 'recording';
  const confirming = state === 'confirm-delete';
  // Pale cards (the skull is nearly white) need dark text on their colour.
  const onColor = readableTextOn(color);

  return (
    <li
      className={`audio-row${clip ? ' has-clip' : ''}${recording ? ' is-recording' : ''}`}
      style={{ '--row-color': color } as CSSProperties}
    >
      <span className="audio-row-num" style={{ background: color, color: onColor, fontFamily: fonts.head }}>
        {badge}
      </span>

      <div className="audio-row-main">
        <div className="audio-row-name" style={{ fontFamily: fonts.body }}>{name}</div>

        {recording ? (
          <div className="audio-row-meta recording" style={{ fontFamily: fonts.body }}>
            <span className="audio-rec-dot" aria-hidden="true" />
            {labels.recording} {formatClipDuration(Math.max(1000, elapsedMs))}
          </div>
        ) : clip ? (
          <div className="audio-row-meta" style={{ fontFamily: fonts.body }}>
            <span className="audio-chip" style={{ background: color, color: onColor }}>
              {clip.source === 'recording' ? labels.sourceRecording : labels.sourceFile}
            </span>
            <span>{formatClipDuration(clip.durationMs)}</span>
            <span className="audio-dot" aria-hidden="true">·</span>
            <span>{formatBytes(clip.bytes)}</span>
          </div>
        ) : (
          <div className="audio-row-meta muted" style={{ fontFamily: fonts.body }}>
            {hint ?? labels.systemVoice}
          </div>
        )}
      </div>

      <div className="audio-row-actions">
        {recording ? (
          <>
            <button
              type="button"
              className="audio-btn ok"
              onClick={onSaveRecording}
              aria-label={labels.saveRecording}
              title={labels.saveRecording}
            >
              {ICON.check}
            </button>
            <button
              type="button"
              className="audio-btn"
              onClick={onDiscardRecording}
              aria-label={labels.discardRecording}
              title={labels.discardRecording}
            >
              {ICON.close}
            </button>
          </>
        ) : confirming ? (
          <>
            <span className="audio-confirm-text" style={{ fontFamily: fonts.body }}>
              {labels.deleteQuestion}
            </span>
            <button
              type="button"
              className="audio-btn danger"
              onClick={onConfirmDelete}
              aria-label={labels.yes}
              title={labels.yes}
            >
              {ICON.check}
            </button>
            <button
              type="button"
              className="audio-btn"
              onClick={onCancelDelete}
              aria-label={labels.no}
              title={labels.no}
            >
              {ICON.close}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className={`audio-btn play${playing ? ' active' : ''}`}
              onClick={playing ? onStopPlay : onPlay}
              disabled={busy}
              aria-label={playing ? labels.stop : labels.play}
              title={playing ? labels.stop : labels.play}
            >
              {playing ? ICON.stop : ICON.play}
            </button>
            <button
              type="button"
              className="audio-btn rec"
              onClick={onStartRecord}
              disabled={busy || !canRecord}
              aria-label={labels.record}
              title={labels.record}
            >
              {ICON.mic}
            </button>
            <button
              type="button"
              className="audio-btn"
              onClick={onUpload}
              disabled={busy || !canStore}
              aria-label={labels.upload}
              title={labels.upload}
            >
              {ICON.upload}
            </button>
            <button
              type="button"
              className="audio-btn del"
              onClick={onAskDelete}
              disabled={busy || !clip}
              aria-label={labels.delete}
              title={labels.delete}
            >
              {ICON.trash}
            </button>
          </>
        )}
      </div>
    </li>
  );
}

import type { FontPair, Palette } from '../types';

type PrimaryMode = 'call' | 'pause' | 'resume' | 'restart';

interface Props {
  primaryMode: PrimaryMode;
  canRepeat: boolean;
  canNext: boolean;
  onRepeat: () => void;
  onTogglePlay: () => void;
  onNext: () => void;
  palette: Palette;
  fonts: FontPair;
  labels: {
    repeat: string;
    next: string;
    call: string;
    pause: string;
    resume: string;
    restart: string;
  };
}

export function Controls({
  primaryMode,
  canRepeat,
  canNext,
  onRepeat,
  onTogglePlay,
  onNext,
  palette,
  fonts,
  labels,
}: Props) {
  const primaryLabel =
    primaryMode === 'call' ? labels.call
    : primaryMode === 'pause' ? labels.pause
    : primaryMode === 'resume' ? labels.resume
    : labels.restart;

  return (
    <div className="controls">
      <button
        type="button"
        className="ctrl ctrl-secondary"
        onClick={onRepeat}
        disabled={!canRepeat}
        aria-label={labels.repeat}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="1 4 1 10 7 10"/>
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
        </svg>
        <span style={{ fontFamily: fonts.body }}>{labels.repeat}</span>
      </button>

      <button
        type="button"
        className="ctrl ctrl-primary"
        onClick={onTogglePlay}
        style={{ background: palette.accent }}
        aria-label={primaryLabel}
        aria-pressed={primaryMode === 'pause'}
      >
        {primaryMode === 'restart' ? (
          <>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
            <span style={{ fontFamily: fonts.head, color: 'white' }}>{labels.restart}</span>
          </>
        ) : primaryMode === 'pause' ? (
          <>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14"/>
              <rect x="14" y="5" width="4" height="14"/>
            </svg>
            <span style={{ fontFamily: fonts.head, color: 'white' }}>{labels.pause}</span>
          </>
        ) : (
          <>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="white" aria-hidden="true">
              <polygon points="6 4 20 12 6 20"/>
            </svg>
            <span style={{ fontFamily: fonts.head, color: 'white' }}>
              {primaryMode === 'resume' ? labels.resume : labels.call}
            </span>
          </>
        )}
      </button>

      <button
        type="button"
        className="ctrl ctrl-secondary"
        onClick={onNext}
        disabled={!canNext}
        aria-label={labels.next}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="5 4 15 12 5 20"/>
          <line x1="19" y1="5" x2="19" y2="19"/>
        </svg>
        <span style={{ fontFamily: fonts.body }}>{labels.next}</span>
      </button>
    </div>
  );
}

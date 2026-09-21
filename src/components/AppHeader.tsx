import type { FontPair, Language } from '../types';

interface Props {
  language: Language;
  onToggleLanguage: () => void;
  onOpenAudio: () => void;
  onOpenSettings: () => void;
  fonts: FontPair;
  brandSub: string;
  langButtonLabel: string;
  audioButtonLabel: string;
  /** How many clips are stored, shown as a dot on the audio button. */
  audioClipCount: number;
  settingsButtonLabel: string;
}

export function AppHeader({
  language,
  onToggleLanguage,
  onOpenAudio,
  onOpenSettings,
  fonts,
  brandSub,
  langButtonLabel,
  audioButtonLabel,
  audioClipCount,
  settingsButtonLabel,
}: Props) {
  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-mark" style={{ fontFamily: fonts.head }}>L</div>
        <div className="brand-text">
          <div className="brand-title" style={{ fontFamily: fonts.head }}>Lotería</div>
          <div className="brand-sub" style={{ fontFamily: fonts.body }}>{brandSub}</div>
        </div>
      </div>
      <div className="header-actions">
        <button type="button" className="icon-btn" onClick={onToggleLanguage} aria-label={langButtonLabel}>
          <span style={{ fontFamily: fonts.head, fontSize: 14 }}>{language.toUpperCase()}</span>
        </button>
        <button type="button" className="icon-btn" onClick={onOpenAudio} aria-label={audioButtonLabel}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="2" width="6" height="11" rx="3"/>
            <path d="M5 11v1a7 7 0 0 0 14 0v-1"/>
            <line x1="12" y1="19" x2="12" y2="22"/>
          </svg>
          {audioClipCount > 0 && <span className="icon-btn-dot" aria-hidden="true" />}
        </button>

        <button type="button" className="icon-btn" onClick={onOpenSettings} aria-label={settingsButtonLabel}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      </div>
    </header>
  );
}

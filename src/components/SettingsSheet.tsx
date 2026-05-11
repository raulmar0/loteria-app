import { BottomSheet } from './BottomSheet';
import { Segmented } from './Segmented';
import { Switch } from './Switch';
import { SPEEDS } from '../data/speeds';
import type { FontPair, Language, Palette, SpeedKey, Tweaks } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  tweaks: Tweaks;
  setTweak: <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => void;
  onResetDeck: () => void;
  canResetDeck: boolean;
  canInstallPwa: boolean;
  installingPwa: boolean;
  onInstallPwa: () => void;
  showIosInstallHint: boolean;
  onIosShare?: () => void;
  canUpdatePwa: boolean;
  updatingPwa: boolean;
  onUpdatePwa: () => void;
  palette: Palette;
  fonts: FontPair;
  ttsSupported: boolean;
  labels: {
    title: string;
    close: string;
    voice: string;
    voiceDesc: string;
    voiceUnsupported: string;
    verses: string;
    versesDesc: string;
    speed: string;
    language: string;
    installApp: string;
    installAppDesc: string;
    installAppButton: string;
    iosInstallHint: string;
    updateApp: string;
    updateAppDesc: string;
    updateAppButton: string;
    updateAppUpdating: string;
    resetDeck: string;
    about: string;
    aboutDesc: string;
  };
}

export function SettingsSheet({
  open,
  onClose,
  tweaks,
  setTweak,
  onResetDeck,
  canResetDeck,
  canInstallPwa,
  installingPwa,
  onInstallPwa,
  showIosInstallHint,
  onIosShare,
  canUpdatePwa,
  updatingPwa,
  onUpdatePwa,
  palette,
  fonts,
  ttsSupported,
  labels,
}: Props) {
  const lang = tweaks.language;

  const speedOptions = (Object.entries(SPEEDS) as Array<[SpeedKey, (typeof SPEEDS)[SpeedKey]]>).map(([k, v]) => ({
    value: k,
    label: (
      <>
        {lang === 'es' ? v.es : v.en} <span className="seg-sec">{v.seconds}s</span>
      </>
    ),
  }));

  const langOptions: Array<{ value: Language; label: string }> = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' },
  ];

  return (
    <BottomSheet open={open} onClose={onClose} title={labels.title} titleFont={fonts.head} closeLabel={labels.close}>
      <div className="setting-row">
        <div className="setting-info">
          <div className="setting-label" style={{ fontFamily: fonts.head }}>{labels.voice}</div>
          <div className="setting-desc" style={{ fontFamily: fonts.body }}>
            {ttsSupported ? labels.voiceDesc : labels.voiceUnsupported}
          </div>
        </div>
        <Switch
          checked={tweaks.voice && ttsSupported}
          onChange={v => setTweak('voice', v)}
          onColor={palette.accent2}
          label={labels.voice}
        />
      </div>

      <div className="setting-row">
        <div className="setting-info">
          <div className="setting-label" style={{ fontFamily: fonts.head }}>{labels.verses}</div>
          <div className="setting-desc" style={{ fontFamily: fonts.body }}>{labels.versesDesc}</div>
        </div>
        <Switch
          checked={tweaks.verses}
          onChange={v => setTweak('verses', v)}
          onColor={palette.accent2}
          label={labels.verses}
        />
      </div>

      <div className="setting-row col">
        <div className="setting-label" style={{ fontFamily: fonts.head }}>{labels.speed}</div>
        <Segmented<SpeedKey>
          ariaLabel={labels.speed}
          value={tweaks.speed}
          options={speedOptions}
          onChange={v => setTweak('speed', v)}
          fontBody={fonts.body}
        />
      </div>

      <div className="setting-row col">
        <div className="setting-label" style={{ fontFamily: fonts.head }}>{labels.language}</div>
        <Segmented<Language>
          ariaLabel={labels.language}
          value={tweaks.language}
          options={langOptions}
          onChange={v => setTweak('language', v)}
          fontBody={fonts.body}
        />
      </div>

      {canInstallPwa && (
        <div className="setting-row">
          <div className="setting-info">
            <div className="setting-label" style={{ fontFamily: fonts.head }}>{labels.installApp}</div>
            <div className="setting-desc" style={{ fontFamily: fonts.body }}>{labels.installAppDesc}</div>
          </div>
          <button
            type="button"
            className="setting-action-btn"
            onClick={onInstallPwa}
            disabled={installingPwa}
            style={{ fontFamily: fonts.head, backgroundColor: palette.accent }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            {labels.installAppButton}
          </button>
        </div>
      )}

      {showIosInstallHint && !canInstallPwa && (
        <div className="setting-row col">
          <div className="setting-label" style={{ fontFamily: fonts.head }}>{labels.installApp}</div>
          {onIosShare ? (
            <button
              type="button"
              className="ios-install-hint ios-install-hint-button"
              onClick={onIosShare}
              style={{ fontFamily: fonts.body }}
            >
              <svg
                className="ios-share-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3v13" />
                <path d="m7 8 5-5 5 5" />
                <path d="M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8" />
              </svg>
              <span>{labels.iosInstallHint}</span>
            </button>
          ) : (
            <div className="ios-install-hint" style={{ fontFamily: fonts.body }}>
              <svg
                className="ios-share-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3v13" />
                <path d="m7 8 5-5 5 5" />
                <path d="M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8" />
              </svg>
              <span>{labels.iosInstallHint}</span>
            </div>
          )}
        </div>
      )}

      {canUpdatePwa && (
        <div className="setting-row">
          <div className="setting-info">
            <div className="setting-label" style={{ fontFamily: fonts.head }}>{labels.updateApp}</div>
            <div className="setting-desc" style={{ fontFamily: fonts.body }}>{labels.updateAppDesc}</div>
          </div>
          <button
            type="button"
            className="setting-action-btn"
            onClick={onUpdatePwa}
            disabled={updatingPwa}
            style={{ fontFamily: fonts.head, backgroundColor: palette.accent2 }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            {updatingPwa ? labels.updateAppUpdating : labels.updateAppButton}
          </button>
        </div>
      )}

      <div className="setting-row">
        <div className="setting-info">
          <div className="setting-label" style={{ fontFamily: fonts.head }}>{labels.about}</div>
          <div className="setting-desc" style={{ fontFamily: fonts.body }}>{labels.aboutDesc}</div>
        </div>
        <div className="setting-version" style={{ fontFamily: fonts.body }}>v{__APP_VERSION__}</div>
      </div>

      <button
        type="button"
        className="reset-btn"
        onClick={onResetDeck}
        disabled={!canResetDeck}
        style={{ fontFamily: fonts.head, borderColor: palette.accent, color: palette.accent }}
      >
        {labels.resetDeck}
      </button>
    </BottomSheet>
  );
}

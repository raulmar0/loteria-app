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
    resetDeck: string;
  };
}

export function SettingsSheet({
  open,
  onClose,
  tweaks,
  setTweak,
  onResetDeck,
  canResetDeck,
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

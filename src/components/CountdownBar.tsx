import type { FontPair, Palette } from '../types';

interface Props {
  progressPct: number;
  secondsLeft: number;
  palette: Palette;
  fonts: FontPair;
  label: string;
}

export function CountdownBar({ progressPct, secondsLeft, palette, fonts, label }: Props) {
  return (
    <div className="countdown-bar">
      <div className="countdown-fill" style={{ width: `${progressPct}%`, background: palette.accent }} />
      <div className="countdown-label" style={{ fontFamily: fonts.body }}>
        {label}{' '}
        <span style={{ fontFamily: fonts.head, color: palette.accent }}>{secondsLeft}s</span>
      </div>
    </div>
  );
}

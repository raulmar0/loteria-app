import type { FontPair, Palette } from '../types';

interface Props {
  count: number;
  onClick: () => void;
  label: string;
  palette: Palette;
  fonts: FontPair;
}

export function HistoryToggle({ count, onClick, label, palette, fonts }: Props) {
  return (
    <button
      type="button"
      className="hist-toggle"
      onClick={onClick}
      disabled={count === 0}
      aria-label={`${label} (${count})`}
    >
      <span style={{ fontFamily: fonts.body }}>{label}</span>
      <span className="hist-badge" style={{ fontFamily: fonts.head, background: palette.accent }}>{count}</span>
    </button>
  );
}

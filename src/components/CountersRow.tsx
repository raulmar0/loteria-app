import type { FontPair, Palette } from '../types';

interface Props {
  called: number;
  remaining: number;
  total: number;
  labels: { called: string; remaining: string; total: string };
  palette: Palette;
  fonts: FontPair;
}

export function CountersRow({ called, remaining, total, labels, palette, fonts }: Props) {
  return (
    <div className="counters">
      <div className="counter">
        <div className="counter-num" style={{ fontFamily: fonts.head, color: palette.accent }}>{called}</div>
        <div className="counter-lbl" style={{ fontFamily: fonts.body }}>{labels.called}</div>
      </div>
      <div className="counter-divider" />
      <div className="counter">
        <div className="counter-num" style={{ fontFamily: fonts.head, color: palette.accent2 }}>{remaining}</div>
        <div className="counter-lbl" style={{ fontFamily: fonts.body }}>{labels.remaining}</div>
      </div>
      <div className="counter-divider" />
      <div className="counter">
        <div className="counter-num" style={{ fontFamily: fonts.head, color: palette.accent4 }}>{total}</div>
        <div className="counter-lbl" style={{ fontFamily: fonts.body }}>{labels.total}</div>
      </div>
    </div>
  );
}

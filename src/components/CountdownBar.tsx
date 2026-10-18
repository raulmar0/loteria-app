import { useRef } from 'react';
import type { FontPair, Palette } from '../types';

interface Props {
  /** Expanded while the caller is running; collapses in place when paused. */
  visible: boolean;
  /** Changes with every card so the fill restarts from empty instead of rewinding. */
  cycleKey: number | undefined;
  progressPct: number;
  secondsLeft: number;
  palette: Palette;
  fonts: FontPair;
  label: string;
}

export function CountdownBar({ visible, cycleKey, progressPct, secondsLeft, palette, fonts, label }: Props) {
  // While collapsing on pause, keep showing where the countdown stopped
  // instead of the reset values the paused state reports.
  const shownRef = useRef({ progressPct, secondsLeft });
  if (visible) shownRef.current = { progressPct, secondsLeft };
  const shown = shownRef.current;

  return (
    <div className={`countdown-slot${visible ? ' open' : ''}`} aria-hidden={!visible}>
      <div className="countdown-slot-inner">
        <div className="countdown-bar">
          <div
            key={cycleKey}
            className="countdown-fill"
            style={{ width: `${shown.progressPct}%`, background: palette.accent }}
          />
          <div className="countdown-label" style={{ fontFamily: fonts.body }}>
            {label}{' '}
            <span style={{ fontFamily: fonts.head, color: palette.accent }}>{shown.secondsLeft}s</span>
          </div>
        </div>
      </div>
    </div>
  );
}

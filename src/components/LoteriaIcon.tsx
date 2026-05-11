import type { CSSProperties } from 'react';
import type { IconName } from '../types';
import { ICON_RENDERERS } from './icons/loteriaIconRenderers';

interface Props {
  name: IconName;
  color?: string;
  accent?: string;
  size?: number;
  style?: CSSProperties;
}

export function LoteriaIcon({ name, color = 'currentColor', accent = 'rgba(0,0,0,0.4)', size = 100, style }: Props) {
  const render = ICON_RENDERERS[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      style={style}
      aria-hidden="true"
    >
      {render ? render(color, accent) : <circle cx="50" cy="50" r="30" fill={color} />}
    </svg>
  );
}

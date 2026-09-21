type Rgb = {
  r: number;
  g: number;
  b: number;
};

const MIN_ICON_CONTRAST = 3;

function parseHexColor(hex: string): Rgb | null {
  const value = hex.trim().replace(/^#/, '');
  const normalized = value.length === 3
    ? value.split('').map(char => `${char}${char}`).join('')
    : value;

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return null;

  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

function channelToLinear(value: number): number {
  const channel = value / 255;
  return channel <= 0.03928
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number {
  const rgb = parseHexColor(hex);
  if (!rgb) return 0;

  return (
    0.2126 * channelToLinear(rgb.r)
    + 0.7152 * channelToLinear(rgb.g)
    + 0.0722 * channelToLinear(rgb.b)
  );
}

export function contrastRatio(a: string, b: string): number {
  const lighter = Math.max(relativeLuminance(a), relativeLuminance(b));
  const darker = Math.min(relativeLuminance(a), relativeLuminance(b));
  return (lighter + 0.05) / (darker + 0.05);
}

const LIGHT_TEXT = '#FFFFFF';
const DARK_TEXT = '#1A1410';

/**
 * Picks white or near-black for text sitting on an arbitrary colour. Unlike
 * `chooseIconFill` this ignores the palette: a card's own colour can be as
 * pale as the skull's cream, and the theme ink is light in dark palettes.
 */
export function readableTextOn(background: string): string {
  return contrastRatio(background, LIGHT_TEXT) >= contrastRatio(background, DARK_TEXT)
    ? LIGHT_TEXT
    : DARK_TEXT;
}

export function chooseIconFill(background: string, primary: string, fallback: string): string {
  if (contrastRatio(background, primary) >= MIN_ICON_CONTRAST) {
    return primary;
  }

  return fallback;
}

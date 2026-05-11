import type { FontKey, FontPair } from '../types';

export const FONTS: Record<FontKey, FontPair> = {
  display: {
    label: 'Display',
    head: "'Alfa Slab One', serif",
    body: "'DM Sans', sans-serif",
  },
  bold: {
    label: 'Bold',
    head: "'Archivo Black', sans-serif",
    body: "'Inter', sans-serif",
  },
  retro: {
    label: 'Retro',
    head: "'Bagel Fat One', cursive",
    body: "'DM Sans', sans-serif",
  },
};

export type IconName =
  | 'gallo' | 'diablito' | 'dama' | 'catrin' | 'paraguas' | 'sirena' | 'escalera'
  | 'botella' | 'barril' | 'arbol' | 'melon' | 'valiente' | 'gorrito' | 'muerte'
  | 'pera' | 'bandera' | 'bandolon' | 'cello' | 'garza' | 'pajaro' | 'mano'
  | 'bota' | 'luna' | 'cotorro' | 'borracho' | 'negrito' | 'corazon' | 'sandia'
  | 'tambor' | 'camaron' | 'jaras' | 'musico' | 'arana' | 'soldado' | 'estrella'
  | 'cazo' | 'mundo' | 'apache' | 'nopal' | 'alacran' | 'rosa' | 'calavera'
  | 'campana' | 'cantarito' | 'venado' | 'sol' | 'corona' | 'chalupa' | 'pino'
  | 'pescado' | 'palma' | 'maceta' | 'arpa' | 'rana';

export interface Card {
  n: number;
  es: string;
  en: string;
  verseEs: string;
  verseEn: string;
  icon: IconName;
  color: string;
}

export type PaletteKey = 'fiesta' | 'noche' | 'desierto' | 'rosa';

export interface Palette {
  label: string;
  bg: string;
  paper: string;
  ink: string;
  inkSoft: string;
  accent: string;
  accent2: string;
  accent3: string;
  accent4: string;
  grain: string;
}

export type FontKey = 'display' | 'bold' | 'retro';

export interface FontPair {
  label: string;
  head: string;
  body: string;
}

export type SpeedKey = 'lento' | 'medio' | 'rapido';

export interface SpeedDef {
  es: string;
  en: string;
  seconds: number;
}

export type Language = 'es' | 'en';

/** Where a custom clip came from: recorded with the mic or picked from a file. */
export type AudioSource = 'recording' | 'file';

/**
 * Everything about a custom clip except the audio itself. Kept apart from the
 * blob so the whole collection can be listed without loading any audio.
 */
export interface CardAudioMeta {
  /** Card number, or `INTRO_AUDIO_KEY` (0) for the caller's intro line. */
  key: number;
  mime: string;
  bytes: number;
  /** 0 when the browser could not report a duration. */
  durationMs: number;
  source: AudioSource;
  /** Original file name for uploads, empty for recordings. */
  name: string;
  updatedAt: number;
}

export type CardAudioMap = Record<number, CardAudioMeta>;

export interface Tweaks {
  palette: PaletteKey;
  font: FontKey;
  voice: boolean;
  verses: boolean;
  speed: SpeedKey;
  language: Language;
  customAudio: boolean;
}

export const TWEAK_DEFAULTS: Tweaks = {
  palette: 'fiesta',
  font: 'display',
  voice: true,
  verses: false,
  speed: 'medio',
  language: 'es',
  customAudio: true,
};

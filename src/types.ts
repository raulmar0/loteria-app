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

export interface Tweaks {
  palette: PaletteKey;
  font: FontKey;
  voice: boolean;
  verses: boolean;
  speed: SpeedKey;
  language: Language;
}

export const TWEAK_DEFAULTS: Tweaks = {
  palette: 'fiesta',
  font: 'display',
  voice: true,
  verses: false,
  speed: 'medio',
  language: 'es',
};

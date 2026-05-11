import type { SpeedDef, SpeedKey } from '../types';

export const SPEEDS: Record<SpeedKey, SpeedDef> = {
  lento:  { es: 'Lento',  en: 'Slow',   seconds: 7 },
  medio:  { es: 'Medio',  en: 'Medium', seconds: 4 },
  rapido: { es: 'Rápido', en: 'Fast',   seconds: 2 },
};

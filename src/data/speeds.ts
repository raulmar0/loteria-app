import type { SpeedDef, SpeedKey } from '../types';

export const SPEEDS: Record<SpeedKey, SpeedDef> = {
  lento:  { es: 'Lento',  en: 'Slow',   seconds: 12 },
  medio:  { es: 'Medio',  en: 'Medium', seconds: 7  },
  rapido: { es: 'Rápido', en: 'Fast',   seconds: 4  },
};

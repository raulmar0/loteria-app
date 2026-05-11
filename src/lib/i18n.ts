import type { Language } from '../types';

export function makeT(language: Language) {
  return (es: string, en: string): string => (language === 'es' ? es : en);
}

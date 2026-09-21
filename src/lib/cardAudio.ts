import type { Card, CardAudioMap, Language } from '../types';

/** Reserved key for the caller's intro line ("corre y se va corriendo con"). */
export const INTRO_AUDIO_KEY = 0;

/** Uploads bigger than this are rejected — a called card is a two-second line. */
export const MAX_CLIP_BYTES = 4 * 1024 * 1024;

/** Recordings stop on their own here so a forgotten mic can't fill the disk. */
export const MAX_RECORD_MS = 20_000;

export type CardAudioError =
  | 'unsupported'
  | 'not-audio'
  | 'too-large'
  | 'quota'
  | 'failed'
  | 'mic-denied'
  | 'mic-insecure'
  | 'mic-failed';

export type AudioFilter = 'all' | 'custom' | 'default';

/** Candidates in preference order; Safari only does mp4, everyone else opus. */
const RECORDER_MIMES = [
  'audio/webm;codecs=opus',
  'audio/webm',
  'audio/mp4',
  'audio/ogg;codecs=opus',
  'audio/ogg',
];

export function pickRecorderMime(isTypeSupported: (type: string) => boolean): string | undefined {
  return RECORDER_MIMES.find(mime => {
    try {
      return isTypeSupported(mime);
    } catch {
      return false;
    }
  });
}

/** `0:03`, or an em dash when the browser never reported a duration. */
export function formatClipDuration(durationMs: number): string {
  if (!Number.isFinite(durationMs) || durationMs <= 0) return '—';
  const totalSeconds = Math.max(1, Math.round(durationMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 KB';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function totalClipBytes(clips: CardAudioMap): number {
  return Object.values(clips).reduce((sum, clip) => sum + (clip?.bytes ?? 0), 0);
}

/** How many of the given cards already have a clip (the intro doesn't count). */
export function countCardClips(clips: CardAudioMap, cards: readonly Card[]): number {
  return cards.reduce((count, card) => (clips[card.n] ? count + 1 : count), 0);
}

/** Lowercase, strip accents and punctuation so "arbol" finds "El Árbol". */
export function normalizeText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Matches the number (7 or 07) and both names, whatever the UI language is. */
export function matchesQuery(card: Card, query: string): boolean {
  const needle = normalizeText(query);
  if (!needle) return true;
  const haystack = [
    String(card.n),
    String(card.n).padStart(2, '0'),
    normalizeText(card.es),
    normalizeText(card.en),
  ];
  return haystack.some(value => value.includes(needle));
}

interface FilterOpts {
  query: string;
  filter: AudioFilter;
  clips: CardAudioMap;
  /**
   * Card to keep on screen even if the filter no longer matches it — a card
   * shouldn't vanish from under the user's finger the moment it gets a clip.
   */
  keep?: number | null;
}

export function filterCards(cards: readonly Card[], { query, filter, clips, keep }: FilterOpts): Card[] {
  return cards.filter(card => {
    if (!matchesQuery(card, query)) return false;
    if (card.n === keep) return true;
    if (filter === 'custom' && !clips[card.n]) return false;
    if (filter === 'default' && clips[card.n]) return false;
    return true;
  });
}

/** Guards the two ways an upload can go wrong before it reaches storage. */
export function validateAudioFile(file: { type: string; size: number; name: string }): CardAudioError | null {
  const looksLikeAudio =
    file.type.startsWith('audio/')
    || (file.type === '' && /\.(mp3|m4a|aac|wav|ogg|oga|opus|webm|flac)$/i.test(file.name));
  if (!looksLikeAudio) return 'not-audio';
  if (file.size > MAX_CLIP_BYTES) return 'too-large';
  return null;
}

/** Storage rejections look different per browser; only the quota one is actionable. */
export function classifyStorageError(err: unknown): CardAudioError {
  const name = (err as { name?: string } | null)?.name;
  if (name === 'QuotaExceededError' || name === 'NS_ERROR_DOM_QUOTA_REACHED') return 'quota';
  return 'failed';
}

/** getUserMedia rejects with NotAllowedError when the user says no. */
export function classifyMicError(err: unknown): CardAudioError {
  const name = (err as { name?: string } | null)?.name;
  if (name === 'NotAllowedError' || name === 'SecurityError' || name === 'PermissionDeniedError') {
    return 'mic-denied';
  }
  return 'mic-failed';
}

/** The line the caller reads aloud, used for the TTS preview in the sheet. */
export function cardSpokenName(card: Card, language: Language): string {
  return language === 'es' ? card.es : card.en;
}

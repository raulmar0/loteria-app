import type { Tweaks } from '../types';

/** Values Simple Analytics accepts on an event or page view. */
export type SaMetadataValue = string | number | boolean;
export type SaMetadata = Record<string, SaMetadataValue>;

type SaEventFn = ((
  event: string,
  metadata?: SaMetadata | (() => void),
  callback?: () => void,
) => void) & { q?: unknown[][] };

type MetadataCollectorInput = { type?: string; path?: string; event?: string } & SaMetadata;

declare global {
  interface Window {
    sa_event?: SaEventFn;
    sa_loaded?: boolean;
    __saContext?: SaMetadata;
    __saLifecycleBound?: boolean;
    saCollectMetadata?: (data?: MetadataCollectorInput) => SaMetadata;
  }
}

const TEXT_LIMIT = 1000;

let context: SaMetadata = {};
const onceKeys = new Set<string>();

export interface AnalyticsSnapshot {
  appVersion: string;
  tweaks: Tweaks;
  online: boolean;
  tts: boolean;
  audioStorage: boolean;
  displayMode: string;
  standalone: boolean;
  cardsCalled: number;
  cardsRemaining: number;
  gameRunning: boolean;
  introPending: boolean;
  clipCount: number;
  cardsWithAudio: number;
  hasIntro: boolean;
}

const DISPLAY_MODES = ['fullscreen', 'standalone', 'minimal-ui', 'window-controls-overlay', 'browser'] as const;

export function normalizeEventName(name: string): string {
  return name.replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '').slice(0, TEXT_LIMIT);
}

export function normalizeMetadataKey(key: string): string {
  return key.replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '').slice(0, 200);
}

/** Drop emails, query strings, and home directories before anything is sent. */
export function scrubText(value: string, max = TEXT_LIMIT): string {
  return value
    .replace(/\s+/g, ' ')
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[email]')
    .replace(/([?&])[^=\s&#]+=[^&\s#]*/g, '$1…')
    .replace(/\/(?:home|Users)\/[^/\s]+/g, '/…')
    .trim()
    .slice(0, max);
}

export function sanitizeMetadata(input: Record<string, unknown> | undefined): SaMetadata {
  if (!input) return {};
  const out: SaMetadata = {};
  for (const [rawKey, rawValue] of Object.entries(input)) {
    const key = normalizeMetadataKey(rawKey);
    if (!key) continue;
    if (typeof rawValue === 'boolean') {
      out[key] = rawValue;
      continue;
    }
    if (typeof rawValue === 'number') {
      if (Number.isFinite(rawValue)) out[key] = rawValue;
      continue;
    }
    if (typeof rawValue === 'string') {
      const text = scrubText(rawValue);
      if (text) out[key] = text;
    }
  }
  return out;
}

/**
 * Context is attached to every hit. Keys already set on that hit stay as they
 * are, so a card event's own `cards_called` is not replaced by a stale copy.
 */
export function metadataFromContext(
  current: SaMetadata,
  already: Record<string, unknown> | undefined,
): SaMetadata {
  const out: SaMetadata = {};
  for (const [key, value] of Object.entries(current)) {
    if (already && already[key] != null) continue;
    out[key] = value;
  }
  return out;
}

export function analyticsContext(snapshot: AnalyticsSnapshot): SaMetadata {
  return sanitizeMetadata({
    app_version: snapshot.appVersion,
    ui_language: snapshot.tweaks.language,
    palette: snapshot.tweaks.palette,
    font: snapshot.tweaks.font,
    speed: snapshot.tweaks.speed,
    voice: snapshot.tweaks.voice,
    verses: snapshot.tweaks.verses,
    custom_audio: snapshot.tweaks.customAudio,
    online: snapshot.online,
    tts: snapshot.tts,
    audio_storage: snapshot.audioStorage,
    display_mode: snapshot.displayMode,
    standalone: snapshot.standalone,
    cards_called: snapshot.cardsCalled,
    cards_remaining: snapshot.cardsRemaining,
    game_running: snapshot.gameRunning,
    intro_pending: snapshot.introPending,
    clip_count: snapshot.clipCount,
    cards_with_audio: snapshot.cardsWithAudio,
    has_intro: snapshot.hasIntro,
  });
}

export function readDisplayMode(match: (query: string) => boolean, navigatorStandalone?: boolean): string {
  if (navigatorStandalone) return 'standalone';
  for (const mode of DISPLAY_MODES) {
    if (match(`(display-mode: ${mode})`)) return mode;
  }
  return 'browser';
}

export function publishAnalyticsContext(partial: Record<string, unknown>): void {
  context = { ...context, ...sanitizeMetadata(partial) };
  if (typeof window !== 'undefined') window.__saContext = context;
}

function ensureEventStub(): void {
  if (typeof window.sa_event === 'function') return;
  const stub: SaEventFn = (...args: unknown[]) => {
    const queued = stub.q ?? [];
    queued.push(args);
    stub.q = queued;
  };
  stub.q = [];
  window.sa_event = stub;
}

export function trackEvent(name: string, metadata?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  const event = normalizeEventName(name);
  if (!event) return;
  ensureEventStub();
  const clean = sanitizeMetadata(metadata);
  try {
    if (Object.keys(clean).length > 0) window.sa_event?.(event, clean);
    else window.sa_event?.(event);
  } catch {
    // Measuring the game must never break the game.
  }
}

export function trackOnce(name: string, metadata?: Record<string, unknown>): void {
  if (onceKeys.has(name)) return;
  onceKeys.add(name);
  trackEvent(name, metadata);
}

export function resetAnalyticsStateForTests(): void {
  onceKeys.clear();
  context = {};
  if (typeof window !== 'undefined') {
    window.__saContext = {};
    window.__saLifecycleBound = false;
  }
}

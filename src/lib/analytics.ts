import { LOTERIA_CARDS } from '../data/cards';
import { loadTweaks } from '../hooks/useTweaks';
import { audioStorageSupported } from './cardAudioStore';
import { isStandalonePwa } from './pwaInstall';
import {
  analyticsContext,
  metadataFromContext,
  publishAnalyticsContext,
  readDisplayMode,
  scrubText,
  trackEvent,
  type AnalyticsSnapshot,
  type SaMetadata,
} from './analyticsMetadata';

export {
  analyticsContext,
  metadataFromContext,
  normalizeEventName,
  normalizeMetadataKey,
  publishAnalyticsContext,
  readDisplayMode,
  sanitizeMetadata,
  scrubText,
  trackEvent,
  trackOnce,
} from './analyticsMetadata';
export type { AnalyticsSnapshot, SaMetadata, SaMetadataValue } from './analyticsMetadata';

const ERROR_LIMIT = 20;
const seenErrors = new Set<string>();

export function publishAppAnalytics(
  state: Omit<AnalyticsSnapshot, 'appVersion' | 'online' | 'displayMode' | 'standalone'>,
): void {
  if (typeof window === 'undefined') return;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  const standalone = isStandalonePwa(
    window.matchMedia?.('(display-mode: standalone)').matches ?? false,
    nav.standalone,
  );
  publishAnalyticsContext(analyticsContext({
    ...state,
    appVersion: __APP_VERSION__,
    online: window.navigator.onLine,
    displayMode: readDisplayMode(query => window.matchMedia?.(query).matches ?? false, nav.standalone),
    standalone,
  }));
}

function contextNumber(key: string): number | undefined {
  const value = window.__saContext?.[key];
  return typeof value === 'number' ? value : undefined;
}

function reportJsError(message: string, source: string, line?: number): void {
  const clean = scrubText(message, 300);
  if (!clean || clean === 'Script error.') return;
  if (seenErrors.has(clean) || seenErrors.size >= ERROR_LIMIT) return;
  seenErrors.add(clean);
  const where = scrubText(source.split('?')[0]?.split('/').pop() || source, 80);
  trackEvent('js_error', {
    message: clean,
    source: where || 'unknown',
    ...(typeof line === 'number' && Number.isFinite(line) ? { line } : {}),
  });
}

function bindLifecycle(): void {
  const startedAt = Date.now();
  let hiddenAt: number | null = null;
  let sessionEnded = false;

  window.addEventListener('error', event => {
    const filename = event.filename || '';
    if (/simpleanalytics|chrome-extension|moz-extension|safari-web-extension/.test(filename)) return;
    reportJsError(event.message || '', filename, event.lineno);
  });

  window.addEventListener('unhandledrejection', event => {
    const reason = event.reason;
    const message = reason instanceof Error ? reason.message : String(reason ?? '');
    reportJsError(message, 'promise');
  });

  const onNetwork = () => {
    const online = window.navigator.onLine;
    publishAnalyticsContext({ online });
    trackEvent('network_change', { online });
  };
  window.addEventListener('online', onNetwork);
  window.addEventListener('offline', onNetwork);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      hiddenAt = Date.now();
      const cardsCalled = contextNumber('cards_called');
      trackEvent('app_background', {
        duration_s: Math.max(0, Math.round((Date.now() - startedAt) / 1000)),
        ...(cardsCalled === undefined ? {} : { cards_called: cardsCalled }),
      });
      return;
    }
    if (hiddenAt === null) return;
    trackEvent('app_foreground', {
      away_s: Math.max(0, Math.round((Date.now() - hiddenAt) / 1000)),
    });
    hiddenAt = null;
  });

  window.addEventListener('pagehide', () => {
    if (sessionEnded) return;
    sessionEnded = true;
    const cardsCalled = contextNumber('cards_called');
    trackEvent('session_end', {
      duration_s: Math.max(0, Math.round((Date.now() - startedAt) / 1000)),
      ...(cardsCalled === undefined ? {} : { cards_called: cardsCalled }),
    });
  });

  window.addEventListener('pageshow', event => {
    if (event.persisted) trackEvent('page_restored');
  });

  window.addEventListener('appinstalled', () => {
    publishAnalyticsContext({ standalone: true, display_mode: 'standalone' });
    trackEvent('pwa_installed');
  });
}

function baselineContext(): SaMetadata {
  const nav = window.navigator as Navigator & { standalone?: boolean };
  const standalone = isStandalonePwa(
    window.matchMedia?.('(display-mode: standalone)').matches ?? false,
    nav.standalone,
  );
  return analyticsContext({
    appVersion: __APP_VERSION__,
    tweaks: loadTweaks(),
    online: window.navigator.onLine,
    tts: 'speechSynthesis' in window,
    audioStorage: audioStorageSupported(),
    displayMode: readDisplayMode(query => window.matchMedia?.(query).matches ?? false, nav.standalone),
    standalone,
    cardsCalled: 0,
    cardsRemaining: LOTERIA_CARDS.length,
    gameRunning: false,
    introPending: false,
    clipCount: 0,
    cardsWithAudio: 0,
    hasIntro: false,
  });
}

/** Queue events, publish visit context, and attach listeners once per page. */
export function installAnalytics(): void {
  if (typeof window === 'undefined') return;
  window.saCollectMetadata = data => metadataFromContext(window.__saContext ?? {}, data);
  publishAnalyticsContext(baselineContext());
  if (window.__saLifecycleBound) return;
  window.__saLifecycleBound = true;
  bindLifecycle();
}

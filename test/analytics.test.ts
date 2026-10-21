import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import {
  analyticsContext,
  metadataFromContext,
  normalizeEventName,
  normalizeMetadataKey,
  readDisplayMode,
  resetAnalyticsStateForTests,
  sanitizeMetadata,
  scrubText,
  trackEvent,
  trackOnce,
} from '../src/lib/analyticsMetadata.ts';
import { TWEAK_DEFAULTS } from '../src/types.ts';

test('sanitizeMetadata keeps booleans, zero, and text, and drops anything else', () => {
  const clean = sanitizeMetadata({
    voice: false,
    cards_called: 0,
    speed: 'medio',
    empty: '',
    blank: '   ',
    missing: null,
    nope: undefined,
    nested: { a: 1 },
    list: ['a'],
    infinite: Infinity,
    bad: Number.NaN,
  });

  assert.deepEqual(clean, {
    voice: false,
    cards_called: 0,
    speed: 'medio',
  });
});

test('sanitizeMetadata scrubs personal data and normalizes keys', () => {
  const clean = sanitizeMetadata({
    '$%!file__': 'demo@example.com sang /home/raul/clip.wav?token=secret',
    ok: 'gallo',
  });

  assert.equal(normalizeMetadataKey('$%!file__'), 'file');
  assert.equal(clean.file, '[email] sang /…/clip.wav?…');
  assert.equal(clean.ok, 'gallo');
});

test('scrubText truncates long messages', () => {
  assert.equal(scrubText('a'.repeat(20), 8), 'aaaaaaaa');
});

test('event names become the alphanumeric form Simple Analytics stores', () => {
  assert.equal(normalizeEventName('Card Called!'), 'Card_Called');
  assert.equal(normalizeEventName('---'), '');
});

test('visit context does not overwrite fields already on the hit', () => {
  const context = analyticsContext({
    appVersion: '0.3.0',
    tweaks: { ...TWEAK_DEFAULTS, language: 'en', voice: false, speed: 'rapido' },
    online: true,
    tts: true,
    audioStorage: true,
    displayMode: 'standalone',
    standalone: true,
    cardsCalled: 4,
    cardsRemaining: 50,
    gameRunning: true,
    introPending: false,
    clipCount: 2,
    cardsWithAudio: 1,
    hasIntro: true,
  });

  const merged = metadataFromContext(context, { cards_called: 5, type: 'event' });

  assert.equal(merged.cards_called, undefined);
  assert.equal(merged.ui_language, 'en');
  assert.equal(merged.voice, false);
  assert.equal(merged.speed, 'rapido');
  assert.equal(merged.display_mode, 'standalone');
  assert.equal(merged.cards_remaining, 50);
  assert.equal(merged.has_intro, true);
});

test('readDisplayMode prefers an installed app and otherwise the first matching mode', () => {
  assert.equal(readDisplayMode(() => false, true), 'standalone');
  assert.equal(
    readDisplayMode(query => query === '(display-mode: minimal-ui)'),
    'minimal-ui',
  );
  assert.equal(readDisplayMode(() => false), 'browser');
});

describe('event delivery', { concurrency: false }, () => {
  test('trackEvent forwards sanitized metadata and ignores empty names', () => {
    resetAnalyticsStateForTests();
    const calls: unknown[][] = [];
    const previous = globalThis.window;
    Object.assign(globalThis, {
      window: {
        sa_event: (...args: unknown[]) => {
          calls.push(args);
        },
      },
    });

    try {
      trackEvent('setting_change', { setting: 'voice', value: false, note: '' });
      trackEvent('!!!');
      assert.deepEqual(calls, [['setting_change', { setting: 'voice', value: false }]]);
    } finally {
      Object.assign(globalThis, { window: previous });
      resetAnalyticsStateForTests();
    }
  });

  test('trackOnce sends a repeated visit event a single time', () => {
    resetAnalyticsStateForTests();
    const calls: string[] = [];
    const previous = globalThis.window;
    Object.assign(globalThis, {
      window: {
        sa_event: (name: string) => {
          calls.push(name);
        },
      },
    });

    try {
      trackOnce('app_open', { clip_count: 3 });
      trackOnce('app_open', { clip_count: 9 });
      assert.deepEqual(calls, ['app_open']);
    } finally {
      Object.assign(globalThis, { window: previous });
      resetAnalyticsStateForTests();
    }
  });
});

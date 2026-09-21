import assert from 'node:assert/strict';
import test from 'node:test';

import { LOTERIA_CARDS } from '../src/data/cards.ts';
import {
  classifyMicError,
  classifyStorageError,
  countCardClips,
  filterCards,
  formatBytes,
  formatClipDuration,
  matchesQuery,
  normalizeText,
  pickRecorderMime,
  totalClipBytes,
  validateAudioFile,
  MAX_CLIP_BYTES,
} from '../src/lib/cardAudio.ts';
import type { CardAudioMap, CardAudioMeta } from '../src/types.ts';

function clip(key: number, overrides: Partial<CardAudioMeta> = {}): CardAudioMeta {
  return {
    key,
    mime: 'audio/webm',
    bytes: 1024,
    durationMs: 2000,
    source: 'recording',
    name: '',
    updatedAt: 0,
    ...overrides,
  };
}

function clipMap(...keys: number[]): CardAudioMap {
  return Object.fromEntries(keys.map(key => [key, clip(key)]));
}

test('formatClipDuration renders minutes and seconds', () => {
  assert.equal(formatClipDuration(3200), '0:03');
  assert.equal(formatClipDuration(65_000), '1:05');
  assert.equal(formatClipDuration(120_000), '2:00');
});

test('formatClipDuration never rounds a real clip down to zero', () => {
  assert.equal(formatClipDuration(120), '0:01');
});

test('formatClipDuration marks unknown lengths', () => {
  assert.equal(formatClipDuration(0), '—');
  assert.equal(formatClipDuration(Number.POSITIVE_INFINITY), '—');
  assert.equal(formatClipDuration(Number.NaN), '—');
});

test('formatBytes switches to MB past a megabyte', () => {
  assert.equal(formatBytes(0), '0 KB');
  assert.equal(formatBytes(200), '1 KB');
  assert.equal(formatBytes(40 * 1024), '40 KB');
  assert.equal(formatBytes(3 * 1024 * 1024), '3.0 MB');
});

test('totalClipBytes adds up every stored clip', () => {
  const clips: CardAudioMap = {
    0: clip(0, { bytes: 500 }),
    7: clip(7, { bytes: 1500 }),
  };
  assert.equal(totalClipBytes(clips), 2000);
  assert.equal(totalClipBytes({}), 0);
});

test('countCardClips ignores the intro clip', () => {
  const clips = clipMap(0, 1, 2);
  assert.equal(countCardClips(clips, LOTERIA_CARDS), 2);
});

test('normalizeText strips accents, case and punctuation', () => {
  assert.equal(normalizeText('El Árbol'), 'el arbol');
  assert.equal(normalizeText('  La  Sandía!  '), 'la sandia');
});

test('matchesQuery finds cards by number, accentless name and other language', () => {
  const arbol = LOTERIA_CARDS.find(card => card.n === 10)!;
  assert.equal(matchesQuery(arbol, 'arbol'), true);
  assert.equal(matchesQuery(arbol, 'ÁRBOL'), true);
  assert.equal(matchesQuery(arbol, 'tree'), true);
  assert.equal(matchesQuery(arbol, '10'), true);
  assert.equal(matchesQuery(arbol, ''), true);
  assert.equal(matchesQuery(arbol, 'rana'), false);
});

test('matchesQuery accepts the zero-padded number shown in the list', () => {
  const gallo = LOTERIA_CARDS.find(card => card.n === 1)!;
  assert.equal(matchesQuery(gallo, '01'), true);
});

test('filterCards splits cards by whether they have a clip', () => {
  const clips = clipMap(1, 2);

  const all = filterCards(LOTERIA_CARDS, { query: '', filter: 'all', clips });
  assert.equal(all.length, LOTERIA_CARDS.length);

  const withAudio = filterCards(LOTERIA_CARDS, { query: '', filter: 'custom', clips });
  assert.deepEqual(withAudio.map(card => card.n), [1, 2]);

  const withoutAudio = filterCards(LOTERIA_CARDS, { query: '', filter: 'default', clips });
  assert.equal(withoutAudio.length, LOTERIA_CARDS.length - 2);
  assert.equal(withoutAudio.some(card => card.n === 1), false);
});

test('filterCards combines the query with the filter', () => {
  const clips = clipMap(1);
  const result = filterCards(LOTERIA_CARDS, { query: 'gallo', filter: 'custom', clips });
  assert.deepEqual(result.map(card => card.n), [1]);

  const empty = filterCards(LOTERIA_CARDS, { query: 'gallo', filter: 'default', clips });
  assert.deepEqual(empty, []);
});

test('filterCards keeps the card the user just touched on screen', () => {
  const clips = clipMap(1);
  const result = filterCards(LOTERIA_CARDS, { query: '', filter: 'default', clips, keep: 1 });
  assert.equal(result.some(card => card.n === 1), true);
});

test('filterCards still hides a kept card that the query excludes', () => {
  const clips = clipMap(1);
  // "rana" is a substring of "La Araña" too — both match, card 1 does not.
  const result = filterCards(LOTERIA_CARDS, { query: 'rana', filter: 'all', clips, keep: 1 });
  assert.deepEqual(result.map(card => card.n), [33, 54]);
});

test('validateAudioFile accepts audio and rejects everything else', () => {
  assert.equal(validateAudioFile({ type: 'audio/mpeg', size: 1000, name: 'gallo.mp3' }), null);
  assert.equal(validateAudioFile({ type: 'image/png', size: 1000, name: 'gallo.png' }), 'not-audio');
  assert.equal(
    validateAudioFile({ type: 'audio/mpeg', size: MAX_CLIP_BYTES + 1, name: 'long.mp3' }),
    'too-large'
  );
});

test('validateAudioFile falls back to the extension when the type is missing', () => {
  assert.equal(validateAudioFile({ type: '', size: 1000, name: 'grabacion.m4a' }), null);
  assert.equal(validateAudioFile({ type: '', size: 1000, name: 'notas.txt' }), 'not-audio');
});

test('pickRecorderMime prefers opus and falls back in order', () => {
  assert.equal(pickRecorderMime(() => true), 'audio/webm;codecs=opus');
  assert.equal(pickRecorderMime(type => type === 'audio/mp4'), 'audio/mp4');
  assert.equal(pickRecorderMime(() => false), undefined);
});

test('pickRecorderMime survives a browser that throws on unknown types', () => {
  assert.equal(
    pickRecorderMime(type => {
      if (type !== 'audio/mp4') throw new TypeError('nope');
      return true;
    }),
    'audio/mp4'
  );
});

test('classifyStorageError singles out a full disk', () => {
  assert.equal(classifyStorageError({ name: 'QuotaExceededError' }), 'quota');
  assert.equal(classifyStorageError(new Error('boom')), 'failed');
  assert.equal(classifyStorageError(null), 'failed');
});

test('classifyMicError separates a refused permission from a broken mic', () => {
  assert.equal(classifyMicError({ name: 'NotAllowedError' }), 'mic-denied');
  assert.equal(classifyMicError({ name: 'SecurityError' }), 'mic-denied');
  assert.equal(classifyMicError({ name: 'NotFoundError' }), 'mic-failed');
  assert.equal(classifyMicError(undefined), 'mic-failed');
});

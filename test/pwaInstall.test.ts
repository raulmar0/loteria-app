import assert from 'node:assert/strict';
import test from 'node:test';

import { isStandalonePwa, promptPwaInstall } from '../src/lib/pwaInstall.ts';

test('promptPwaInstall returns unavailable when the browser has no install prompt', async () => {
  assert.equal(await promptPwaInstall(null), 'unavailable');
});

test('promptPwaInstall opens the browser install prompt and returns the user outcome', async () => {
  let prompted = false;

  const outcome = await promptPwaInstall({
    prompt: async () => {
      prompted = true;
    },
    userChoice: Promise.resolve({ outcome: 'accepted', platform: 'web' }),
  });

  assert.equal(prompted, true);
  assert.equal(outcome, 'accepted');
});

test('isStandalonePwa detects installed display modes', () => {
  assert.equal(isStandalonePwa(true, false), true);
  assert.equal(isStandalonePwa(false, true), true);
  assert.equal(isStandalonePwa(false, false), false);
});

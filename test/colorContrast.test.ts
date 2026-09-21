import assert from 'node:assert/strict';
import test from 'node:test';

import { chooseIconFill, contrastRatio, readableTextOn, relativeLuminance } from '../src/lib/colorContrast.ts';

test('relativeLuminance returns expected endpoints for black and white', () => {
  assert.equal(relativeLuminance('#000000'), 0);
  assert.equal(relativeLuminance('#FFFFFF'), 1);
});

test('contrastRatio returns the WCAG maximum for black against white', () => {
  assert.equal(contrastRatio('#ffffff', '#000000'), 21);
});

test('chooseIconFill keeps the primary color when it has enough contrast', () => {
  assert.equal(chooseIconFill('#D62828', '#FFFFFF', '#1A1410'), '#FFFFFF');
});

test('chooseIconFill falls back when the primary color is too close to the background', () => {
  assert.equal(chooseIconFill('#FAF3E0', '#FFFFFF', '#1A1410'), '#1A1410');
});

test('readableTextOn puts white on deep card colors', () => {
  assert.equal(readableTextOn('#D62828'), '#FFFFFF');
  assert.equal(readableTextOn('#1D3557'), '#FFFFFF');
});

test('readableTextOn puts dark ink on pale card colors', () => {
  assert.equal(readableTextOn('#FAF3E0'), '#1A1410');
  assert.equal(readableTextOn('#FFB703'), '#1A1410');
});

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { cx } from './cx.js';
import { colorFor, initials } from './initials.js';
import { computePosition } from './position.js';
import { ACCENT_COLORS, COLORS } from './tokens.js';

describe('cx', () => {
  it('joins strings, skips falsy, reads objects and arrays', () => {
    expect(cx('a', false, null, undefined, 0, 'b')).toBe('a b');
    expect(cx({ on: true, off: false }, ['x', ['y', { z: 1 }]])).toBe(
      'on x y z',
    );
    expect(cx()).toBe('');
  });
});

describe('initials / colorFor', () => {
  it('builds initials from names', () => {
    expect(initials('Nadia El-Sayed')).toBe('NE');
    expect(initials('kareem')).toBe('KA');
    expect(initials('  ')).toBe('?');
    expect(initials('a.b.c', 3)).toBe('ABC');
  });

  it('is stable and picks an accent colour', () => {
    expect(colorFor('Omar')).toBe(colorFor('Omar'));
    expect(ACCENT_COLORS).toContain(colorFor('anything'));
  });
});

describe('computePosition', () => {
  const viewport = { width: 1000, height: 800 };
  const anchor = { top: 100, left: 100, width: 80, height: 30 };
  const float = { top: 0, left: 0, width: 200, height: 100 };

  it('places below-start by default', () => {
    expect(computePosition(anchor, float, { viewport })).toEqual({
      x: 100,
      y: 136,
      placement: 'bottom-start',
    });
  });

  it('flips to the top when there is no room below', () => {
    const low = { ...anchor, top: 750 };
    const r = computePosition(low, float, { viewport, placement: 'bottom' });
    expect(r.placement).toBe('top');
    expect(r.y).toBe(750 - 100 - 6);
  });

  it('mirrors -start / -end under RTL', () => {
    const mid = { ...anchor, left: 500 };
    const ltr = computePosition(mid, float, {
      viewport,
      placement: 'bottom-start',
    });
    const rtl = computePosition(mid, float, {
      viewport,
      placement: 'bottom-start',
      rtl: true,
    });
    expect(ltr.x).toBe(500);
    expect(rtl.x).toBe(500 + 80 - 200);
    expect(rtl.placement).toBe('bottom-start');
  });

  it('shifts back inside the viewport', () => {
    const edge = { ...anchor, left: 950 };
    const r = computePosition(edge, float, { viewport });
    expect(r.x).toBe(1000 - 200 - 8);
  });
});

describe('tokens', () => {
  it('lists the same colours as the SCSS config', () => {
    const scss = readFileSync(
      resolve(process.cwd(), 'src/scss/_config.scss'),
      'utf8',
    );
    const block = scss.slice(
      scss.indexOf('$default-colors'),
      scss.indexOf(');', scss.indexOf('$default-colors')),
    );
    const names = [...block.matchAll(/'([a-z]+)':/g)].map((m) => m[1]);
    expect(names).toEqual([...COLORS]);
  });
});

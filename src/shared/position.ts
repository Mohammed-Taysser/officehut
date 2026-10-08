import type { Placement } from './tokens.js';

export interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface PositionOptions {
  placement?: Placement;
  /** Gap between anchor and floating element, px. */
  offset?: number;
  /** Keep this far from the viewport edge, px. */
  padding?: number;
  /** Flip to the opposite side when there's not enough room. */
  flip?: boolean;
  /** Right-to-left: `-start` / `-end` alignments mirror. */
  rtl?: boolean;
  viewport?: { width: number; height: number };
}

export interface PositionResult {
  x: number;
  y: number;
  placement: Placement;
}

type Side = 'top' | 'bottom' | 'left' | 'right';
type Align = 'start' | 'end' | undefined;

const OPPOSITE: Record<Side, Side> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

function split(p: Placement): [Side, Align] {
  const [side, align] = p.split('-') as [Side, Align];
  return [side, align];
}

function place(
  anchor: Rect,
  float: Rect,
  side: Side,
  align: Align,
  offset: number,
) {
  if (side === 'top' || side === 'bottom') {
    return {
      y:
        side === 'top'
          ? anchor.top - float.height - offset
          : anchor.top + anchor.height + offset,
      x:
        align === 'start'
          ? anchor.left
          : align === 'end'
            ? anchor.left + anchor.width - float.width
            : anchor.left + (anchor.width - float.width) / 2,
    };
  }
  return {
    x:
      side === 'left'
        ? anchor.left - float.width - offset
        : anchor.left + anchor.width + offset,
    y:
      align === 'start'
        ? anchor.top
        : align === 'end'
          ? anchor.top + anchor.height - float.height
          : anchor.top + (anchor.height - float.height) / 2,
  };
}

function overflows(
  x: number,
  y: number,
  float: Rect,
  vw: number,
  vh: number,
  pad: number,
  side: Side,
) {
  if (side === 'top') return y < pad;
  if (side === 'bottom') return y + float.height > vh - pad;
  if (side === 'left') return x < pad;
  return x + float.width > vw - pad;
}

/**
 * Pure positioning maths (viewport coordinates, i.e. for `position: fixed`).
 * Tries the requested side, flips if it overflows, then shifts along the
 * cross axis to stay on-screen. No dependencies, ~1 kB.
 */
export function computePosition(
  anchor: Rect,
  float: Rect,
  opts: PositionOptions = {},
): PositionResult {
  const {
    placement = 'bottom-start',
    offset = 6,
    padding = 8,
    flip = true,
    rtl = false,
  } = opts;
  const vw =
    opts.viewport?.width ??
    (typeof window === 'undefined' ? 1024 : window.innerWidth);
  const vh =
    opts.viewport?.height ??
    (typeof window === 'undefined' ? 768 : window.innerHeight);

  const [initialSide, logicalAlign] = split(placement);
  let side = initialSide;
  // Under RTL, "start" is the right edge for top/bottom placements.
  const vertical = initialSide === 'top' || initialSide === 'bottom';
  const align: Align =
    rtl && vertical && logicalAlign
      ? logicalAlign === 'start'
        ? 'end'
        : 'start'
      : logicalAlign;
  let { x, y } = place(anchor, float, side, align, offset);

  if (flip && overflows(x, y, float, vw, vh, padding, side)) {
    const alt = OPPOSITE[side];
    const next = place(anchor, float, alt, align, offset);
    if (!overflows(next.x, next.y, float, vw, vh, padding, alt)) {
      side = alt;
      ({ x, y } = next);
    }
  }

  // shift along the cross axis
  if (side === 'top' || side === 'bottom') {
    x = Math.min(
      Math.max(x, padding),
      Math.max(padding, vw - float.width - padding),
    );
  } else {
    y = Math.min(
      Math.max(y, padding),
      Math.max(padding, vh - float.height - padding),
    );
  }

  return {
    x: Math.round(x),
    y: Math.round(y),
    placement: (logicalAlign ? `${side}-${logicalAlign}` : side) as Placement,
  };
}

/** Is this element laid out right-to-left? */
export function isRtl(el: Element): boolean {
  return getComputedStyle(el).direction === 'rtl';
}

/** The `data-oh-theme` of the nearest themed ancestor, ignoring `<html>`. */
export function scopedTheme(el: Element | null): string | undefined {
  const themed = el?.closest('[data-oh-theme]');
  return themed && themed !== document.documentElement
    ? (themed.getAttribute('data-oh-theme') ?? undefined)
    : undefined;
}

export function rectOf(el: Element): Rect {
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

import {
  computePosition,
  isRtl,
  rectOf,
  scopedTheme,
} from '../../shared/position.js';
import type { Placement } from '../../shared/tokens.js';
import { ensureId } from '../core/dom.js';

let tip: HTMLElement | null = null;
let current: HTMLElement | null = null;
let showTimer: ReturnType<typeof setTimeout> | undefined;

function bubble(): HTMLElement {
  if (!tip) {
    tip = document.createElement('div');
    tip.className = 'tooltip';
    tip.setAttribute('role', 'tooltip');
    tip.id = 'oh-tooltip';
    document.body.append(tip);
  }
  return tip;
}

/** Show the tooltip for an element carrying `data-oh-tooltip="text"`. */
export function showTooltip(
  anchor: HTMLElement,
  text = anchor.dataset.ohTooltip ?? '',
): void {
  if (!text) return;
  const el = bubble();
  current = anchor;
  el.textContent = text;
  const theme = scopedTheme(anchor);
  if (theme) el.setAttribute('data-oh-theme', theme);
  else el.removeAttribute('data-oh-theme');
  el.classList.add('is-open');
  anchor.setAttribute('aria-describedby', ensureId(el));
  const { x, y } = computePosition(rectOf(anchor), rectOf(el), {
    placement: (anchor.dataset.ohPlacement as Placement | undefined) ?? 'top',
    offset: 6,
    rtl: isRtl(anchor),
  });
  el.style.transform = `translate(${x}px, ${y}px)`;
}

export function hideTooltip(): void {
  clearTimeout(showTimer);
  if (current) current.removeAttribute('aria-describedby');
  current = null;
  tip?.classList.remove('is-open');
}

/** Delegated listeners: hover (with a short delay) and keyboard focus. */
export function bindTooltips(
  root: Document | HTMLElement = document,
): () => void {
  const over = (e: Event) => {
    const a = (e.target as Element).closest?.<HTMLElement>('[data-oh-tooltip]');
    if (!a || a === current) return;
    clearTimeout(showTimer);
    showTimer = setTimeout(
      () => showTooltip(a),
      e.type === 'focusin' ? 0 : 250,
    );
  };
  const out = (e: Event) => {
    const a = (e.target as Element).closest?.('[data-oh-tooltip]');
    if (a) hideTooltip();
  };
  const esc = (e: KeyboardEvent) => e.key === 'Escape' && hideTooltip();
  root.addEventListener('mouseover', over);
  root.addEventListener('focusin', over);
  root.addEventListener('mouseout', out);
  root.addEventListener('focusout', out);
  document.addEventListener('keydown', esc);
  window.addEventListener('scroll', hideTooltip, true);
  return () => {
    root.removeEventListener('mouseover', over);
    root.removeEventListener('focusin', over);
    root.removeEventListener('mouseout', out);
    root.removeEventListener('focusout', out);
    document.removeEventListener('keydown', esc);
    window.removeEventListener('scroll', hideTooltip, true);
  };
}

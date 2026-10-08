import { afterTransition } from '../core/dom.js';

const DISMISSABLE = '.alert, .toast, .chip, [data-oh-dismissable]';

/**
 * Remove an alert / toast / chip. Fires a cancelable `oh:dismiss` on the
 * element first, then `oh:dismissed` after it has left the DOM (on document).
 */
export function dismiss(el: HTMLElement): boolean {
  const ok = el.dispatchEvent(
    new CustomEvent('oh:dismiss', { bubbles: true, cancelable: true }),
  );
  if (!ok) return false;
  el.classList.add('is-leaving');
  afterTransition(el, () => {
    el.remove();
    document.dispatchEvent(
      new CustomEvent('oh:dismissed', { detail: { element: el } }),
    );
  });
  return true;
}

/** Handle a click on `[data-oh-dismiss]`. The value can be a selector, else the closest dismissable. */
export function handleDismissClick(trigger: HTMLElement): void {
  const value = trigger.getAttribute('data-oh-dismiss') ?? '';
  const keyword = ['', 'true', 'alert', 'toast', 'chip', 'modal'].includes(
    value,
  );
  const target = keyword
    ? trigger.closest<HTMLElement>(value === 'modal' ? 'dialog' : DISMISSABLE)
    : document.querySelector<HTMLElement>(value);
  if (!target) return;
  if (target instanceof HTMLDialogElement) {
    target.close();
    return;
  }
  dismiss(target);
}

export const FOCUSABLE = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function focusableIn(root: Element): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
    (el) => !el.hasAttribute('inert') && el.getClientRects().length > 0,
  );
}

/**
 * Keep Tab / Shift+Tab inside `container`. Returns a function that releases the
 * trap and restores focus to whatever had it before.
 */
export function trapFocus(
  container: HTMLElement,
  initial?: HTMLElement | null,
): () => void {
  const previous = document.activeElement as HTMLElement | null;

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;
    const items = focusableIn(container);
    if (items.length === 0) {
      event.preventDefault();
      container.focus();
      return;
    }
    const first = items[0]!;
    const last = items[items.length - 1]!;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  container.addEventListener('keydown', onKeydown);
  (initial ?? focusableIn(container)[0] ?? container).focus({
    preventScroll: true,
  });

  return () => {
    container.removeEventListener('keydown', onKeydown);
    previous?.focus?.({ preventScroll: true });
  };
}

let locks = 0;
let saved = '';

/** Reference-counted body scroll lock (nested modals are fine). */
export function lockScroll(): () => void {
  if (locks++ === 0) {
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    saved = document.body.style.cssText;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingInlineEnd = `${scrollbar}px`;
  }
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--locks === 0) document.body.style.cssText = saved;
  };
}

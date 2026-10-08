/** Resolve the element a trigger controls: `data-oh-target`, then `href="#id"`, then `aria-controls`. */
export function resolveTarget(trigger: Element): HTMLElement | null {
  const selector =
    trigger.getAttribute('data-oh-target') ||
    (trigger.getAttribute('href')?.startsWith('#')
      ? trigger.getAttribute('href')
      : null) ||
    (trigger.getAttribute('aria-controls')
      ? `#${trigger.getAttribute('aria-controls')}`
      : null);
  if (!selector || selector === '#') return null;
  try {
    return document.querySelector<HTMLElement>(selector);
  } catch {
    return null;
  }
}

/** Run `fn` after the element's CSS transition ends (or immediately if none). */
export function afterTransition(el: HTMLElement, fn: () => void): void {
  const style = getComputedStyle(el);
  const duration =
    (parseFloat(style.transitionDuration) || 0) +
    (parseFloat(style.transitionDelay) || 0);
  if (duration === 0) {
    fn();
    return;
  }
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    el.removeEventListener('transitionend', finish);
    fn();
  };
  el.addEventListener('transitionend', finish);
  setTimeout(finish, duration * 1000 + 50);
}

let uid = 0;
/** Ensure the element has an id (for aria-controls / aria-describedby). */
export function ensureId(el: Element, prefix = 'oh'): string {
  if (!el.id) el.id = `${prefix}-${++uid}`;
  return el.id;
}

export const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined';

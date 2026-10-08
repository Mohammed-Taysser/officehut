import { dismiss } from './dismiss.js';
import type { Color } from '../../shared/tokens.js';
import { scopedTheme } from '../../shared/position.js';

export interface ToastOptions {
  title?: string;
  message?: string;
  color?: Color;
  /** ms before auto-dismiss; 0 keeps it until closed. Default 5000. */
  duration?: number;
  position?: 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start';
  /** Optional action button. */
  action?: { label: string; onClick: () => void };
  /**
   * Element the toast is about. Toasts live in <body>; passing a scope lets
   * them pick up a `data-oh-theme` set on part of the page.
   */
  scope?: Element | null;
}

function stackFor(
  position: NonNullable<ToastOptions['position']>,
): HTMLElement {
  const key = `oh-toasts-${position}`;
  let stack = document.getElementById(key);
  if (!stack) {
    stack = document.createElement('div');
    stack.id = key;
    stack.className = 'toast-stack';
    if (position.startsWith('top')) stack.classList.add('is-top');
    if (position.endsWith('start')) stack.classList.add('is-start');
    stack.setAttribute('role', 'region');
    stack.setAttribute('aria-label', 'Notifications');
    document.body.append(stack);
  }
  return stack;
}

/**
 * Show a toast. Returns a function that dismisses it early.
 *
 *   toast({ title: 'Invoice sent', message: 'INV-2041 to Acme Ltd.', color: 'success' })
 */
export function toast(options: ToastOptions | string): () => void {
  const opts: ToastOptions =
    typeof options === 'string' ? { message: options } : options;
  const {
    title,
    message,
    color,
    duration = 5000,
    position = 'bottom-end',
    action,
    scope,
  } = opts;

  const el = document.createElement('div');
  el.className = `toast${color ? ` toast-${color}` : ''}`;
  const theme = scope ? scopedTheme(scope) : undefined;
  if (theme) el.setAttribute('data-oh-theme', theme);
  el.setAttribute('role', color === 'danger' ? 'alert' : 'status');
  el.setAttribute('aria-live', color === 'danger' ? 'assertive' : 'polite');

  const body = document.createElement('div');
  body.className = 'toast-body';
  if (title) {
    const h = document.createElement('p');
    h.className = 'toast-title';
    h.textContent = title;
    body.append(h);
  }
  if (message) {
    const p = document.createElement('div');
    p.className = 'toast-text';
    p.textContent = message;
    body.append(p);
  }
  if (action) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-sm btn-link px-0 mt-1';
    btn.textContent = action.label;
    btn.addEventListener('click', () => {
      action.onClick();
      dismiss(el);
    });
    body.append(btn);
  }

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'btn-close';
  close.setAttribute('aria-label', 'Close');
  close.setAttribute('data-oh-dismiss', 'toast');
  close.addEventListener('click', () => dismiss(el));
  el.append(body, close);

  let timer: ReturnType<typeof setTimeout> | undefined;
  if (duration > 0) {
    const line = document.createElement('div');
    line.className = 'toast-timer';
    line.style.setProperty('--_duration', `${duration}ms`);
    el.append(line);
    let remaining = duration;
    let started = Date.now();
    const start = () => {
      started = Date.now();
      timer = setTimeout(() => dismiss(el), remaining);
    };
    let paused = false;
    const pause = () => {
      if (paused) return;
      paused = true;
      clearTimeout(timer);
      remaining -= Date.now() - started;
      el.classList.add('is-paused');
    };
    const resume = () => {
      if (
        !paused ||
        el.matches(':hover') ||
        el.contains(document.activeElement)
      )
        return;
      paused = false;
      el.classList.remove('is-paused');
      start();
    };
    // Hover and keyboard focus both hold the toast open.
    el.addEventListener('mouseenter', pause);
    el.addEventListener('focusin', pause);
    el.addEventListener('mouseleave', resume);
    el.addEventListener('focusout', () => setTimeout(resume));
    start();
  }

  stackFor(position).append(el);
  return () => {
    clearTimeout(timer);
    if (el.isConnected) dismiss(el);
  };
}

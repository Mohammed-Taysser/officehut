import {
  DENSITY_ATTR,
  THEME_ATTR,
  THEMES,
  type Density,
  type Theme,
} from '../../shared/tokens.js';

const STORAGE_KEY = 'oh-theme';

function storage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

/** Current theme of `root` (defaults to `<html>`). */
export function getTheme(root: HTMLElement = document.documentElement): Theme {
  const value = root.getAttribute(THEME_ATTR);
  return (THEMES as readonly string[]).includes(value ?? '')
    ? (value as Theme)
    : 'light';
}

/** Theme actually painted right now — resolves `auto` against the OS setting. */
export function resolvedTheme(
  root: HTMLElement = document.documentElement,
): 'light' | 'dark' {
  const t = getTheme(root);
  if (t !== 'auto') return t;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export interface SetThemeOptions {
  /** Element to theme; defaults to `<html>`. */
  root?: HTMLElement;
  /** Save to localStorage; defaults to true for `<html>` only. */
  persist?: boolean;
}

export function setTheme(theme: Theme, options: SetThemeOptions = {}): void {
  const root = options.root ?? document.documentElement;
  const persist = options.persist ?? root === document.documentElement;
  root.setAttribute(THEME_ATTR, theme);
  if (persist) storage()?.setItem(STORAGE_KEY, theme);
  root.dispatchEvent(
    new CustomEvent('oh:theme', { bubbles: true, detail: { theme } }),
  );
}

/** Flip between light and dark (from whatever is painted now). */
export function toggleTheme(
  root: HTMLElement = document.documentElement,
): Theme {
  const next = resolvedTheme(root) === 'dark' ? 'light' : 'dark';
  setTheme(next, { root });
  return next;
}

/** Restore the saved theme on page load. Call as early as possible. */
export function restoreTheme(fallback: Theme = 'light'): Theme {
  const saved = storage()?.getItem(STORAGE_KEY) as Theme | null;
  const theme =
    saved && (THEMES as readonly string[]).includes(saved) ? saved : fallback;
  document.documentElement.setAttribute(THEME_ATTR, theme);
  return theme;
}

export function setDensity(
  density: Density,
  root: HTMLElement = document.documentElement,
): void {
  if (density === 'comfortable') root.removeAttribute(DENSITY_ATTR);
  else root.setAttribute(DENSITY_ATTR, density);
}

export function handleThemeClick(trigger: HTMLElement): void {
  const value = trigger.getAttribute('data-oh-value') as Theme | null;
  if (value) setTheme(value);
  else toggleTheme();
}

import { useCallback, useSyncExternalStore } from 'react';
import { getTheme, setTheme as applyTheme } from '../../js/components/theme.js';
import { THEME_ATTR, type Theme } from '../../shared/tokens.js';

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [THEME_ATTR],
  });
  return () => observer.disconnect();
}

/**
 * Read and set the page theme (`<html data-oh-theme>`). Stays in sync if the
 * theme is changed elsewhere (vanilla toggles, other components).
 */
export function useTheme(): [Theme, (theme: Theme) => void] {
  const theme = useSyncExternalStore(
    subscribe,
    () => getTheme(),
    () => 'light' as Theme,
  );
  const set = useCallback((t: Theme) => applyTheme(t), []);
  return [theme, set];
}

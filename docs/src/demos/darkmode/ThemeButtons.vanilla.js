// 1. Attributes only: initAll() wires these up. No value = flip light/dark.
//
//   <button class="btn" data-oh-toggle="theme" data-oh-value="dark">Night shift</button>
//   <button class="btn" data-oh-toggle="theme">Flip</button>

// 2. Programmatic
import {
  initAll,
  restoreTheme,
  setTheme,
  toggleTheme,
  resolvedTheme,
  setDensity,
} from 'officehut';

// Run this as early as possible (ideally inline in <head>) to avoid a flash
// of the wrong theme. It reads localStorage 'oh-theme'.
restoreTheme('auto');
initAll();

setTheme('dark'); // saved to localStorage because the root is <html>
toggleTheme(); // from whatever is painted now → 'light'
resolvedTheme(); // 'light' | 'dark', with 'auto' resolved

// Theme just one panel; not saved.
setTheme('dark', { root: document.querySelector('#night-report') });

// Compact density for a data-heavy screen.
setDensity('compact');

document.addEventListener('oh:theme', (event) => {
  console.log('theme is now', event.detail.theme);
});

/**
 * CDN / <script> build. Exposes `window.Officehut` and wires up the data API
 * as soon as the DOM is ready — no setup code needed in plain HTML pages.
 */
import { initAll } from './index.js';

export * from './index.js';

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAll(), {
      once: true,
    });
  } else {
    initAll();
  }
}

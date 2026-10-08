import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
  document.body.innerHTML = '';
  document.documentElement.removeAttribute('data-oh-theme');
  localStorage.clear();
});

// jsdom gaps -----------------------------------------------------------------

if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

const dialog = HTMLDialogElement.prototype;
if (typeof dialog.showModal !== 'function') {
  dialog.showModal = function (this: HTMLDialogElement) {
    this.setAttribute('open', '');
  };
  dialog.show = dialog.showModal;
  dialog.close = function (this: HTMLDialogElement) {
    if (!this.hasAttribute('open')) return;
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
}

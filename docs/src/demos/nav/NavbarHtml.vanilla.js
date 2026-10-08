import 'officehut/css';
import { initAll } from 'officehut';

// The toggle is a normal collapse trigger: initAll() wires every
// [data-oh-toggle="collapse"] on the page, keeps aria-expanded in sync and
// adds .is-open to #demo-navbar-menu. From `lg` up the CSS ignores the
// collapse and the links sit inline.
initAll();

// Close the phone menu after a link is chosen (optional).
document
  .querySelector('#demo-navbar-menu')
  ?.addEventListener('click', (event) => {
    const menu = event.currentTarget;
    if (event.target.closest('a[href]') && menu.classList.contains('is-open')) {
      document.querySelector('[data-oh-target="#demo-navbar-menu"]')?.click();
    }
  });

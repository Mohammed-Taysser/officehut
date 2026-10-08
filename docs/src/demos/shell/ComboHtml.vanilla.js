import 'officehut/css';
import { initAll, getInstance, Collapse } from 'officehut';

// Three triggers point at #demo-html-sidebar — the navbar toggle, the close
// button and the backdrop. initAll() turns each click into Collapse.toggle(),
// which flips .is-open on the sidebar (below `lg` that slides the drawer in)
// and keeps aria-expanded on the triggers in sync.
initAll();

// Optional extras the data API leaves to you: Escape to close, and close
// after a link is chosen on a phone.
const sidebar = document.querySelector('#demo-html-sidebar');
const close = () => getInstance(Collapse, sidebar)?.hide();

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') close();
});
sidebar.addEventListener('click', (event) => {
  if (event.target.closest('a.nav-link[href]')) close();
});

// 1. Attributes only: initAll() handles the click.
//
//   <div class="alert alert-info" role="status" id="alert-welcome">
//     <div class="alert-body">…</div>
//     <button class="btn-close" aria-label="Dismiss" data-oh-dismiss="alert"></button>
//   </div>
//
// data-oh-dismiss can also hold a selector: data-oh-dismiss="#alert-welcome".

// 2. Programmatic
import { initAll, dismiss } from 'officehut';

initAll();

const welcome = document.querySelector('#alert-welcome');

// Remember that it was closed, so it stays closed on the next visit.
welcome.addEventListener('oh:dismiss', () => {
  localStorage.setItem('seen-new-expense-form', '1');
});

// Fired on document after the element has left the DOM.
document.addEventListener('oh:dismissed', (event) => {
  console.log('removed', event.detail.element.id);
});

if (localStorage.getItem('seen-new-expense-form')) dismiss(welcome);

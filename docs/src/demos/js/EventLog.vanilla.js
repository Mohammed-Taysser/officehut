import { initAll, getOrCreate, Collapse, Modal } from 'officehut';

initAll();

// Events bubble, so one listener on a container (or document) sees them all.
document.addEventListener('oh:show', (event) => {
  // Cancelable: stop the export dialog from opening when there's nothing to export.
  if (event.target.id === 'js-export' && ticketCount() === 0)
    event.preventDefault();
});

document.addEventListener('oh:hidden', (event) => {
  console.log('closed', event.target.id);
});

// The same components, driven from code.
const filters = getOrCreate(Collapse, document.querySelector('#js-filters'));
filters.show();

const exportDialog = getOrCreate(Modal, document.querySelector('#js-export'));
document
  .querySelector('#run-export')
  .addEventListener('click', () => exportDialog.show());

function ticketCount() {
  return document.querySelectorAll('[data-ticket]').length;
}

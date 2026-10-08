// 1. Attributes only: initAll() does the rest.
//
//   <button class="btn btn-primary" data-oh-toggle="modal" data-oh-target="#new-vendor">Add vendor</button>
//   <dialog class="modal" id="new-vendor" aria-labelledby="new-vendor-title">
//     <div class="modal-header">
//       <h2 class="modal-title" id="new-vendor-title">Add vendor</h2>
//       <button class="btn-close" aria-label="Close" data-oh-dismiss="modal"></button>
//     </div>
//     <div class="modal-body">…</div>
//     <div class="modal-footer">…</div>
//   </dialog>
//
// Add .modal-drawer to the <dialog> for a side panel.
// data-oh-backdrop-close="false" on the <dialog> ignores backdrop clicks.

// 2. Programmatic
import { initAll, getOrCreate, Modal } from 'officehut';

initAll();

const dialog = document.querySelector('#new-vendor');
const modal = getOrCreate(Modal, dialog);

document.querySelector('#add-vendor').addEventListener('click', (event) => {
  modal.show(event.currentTarget); // focus returns here on close
});

// Ask before throwing away a half-filled form.
dialog.addEventListener('oh:hide', (event) => {
  const form = dialog.querySelector('form');
  if (form && isDirty(form) && !confirm('Discard this vendor?'))
    event.preventDefault();
});

dialog.addEventListener('oh:hidden', () =>
  dialog.querySelector('form')?.reset(),
);

// A <form method="dialog"> inside the dialog also closes it, natively.

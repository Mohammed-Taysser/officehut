// 1. Attributes only: initAll() wires the trigger to the region.
//
//   <button class="btn" data-oh-toggle="collapse" data-oh-target="#vendor-notes"
//           aria-expanded="false" aria-controls="vendor-notes">Vendor notes</button>
//   <div class="collapse" id="vendor-notes">
//     <div>…content…</div>   <!-- one inner wrapper is required -->
//   </div>

// 2. Programmatic
import { initAll, getOrCreate, Collapse } from 'officehut';

initAll();

const region = document.querySelector('#vendor-notes');
const notes = getOrCreate(Collapse, region);

notes.show(); // also sets aria-expanded="true" on its triggers
notes.toggle();
console.log(notes.isOpen); // false

region.addEventListener('oh:shown', () => {
  region.querySelector('textarea')?.focus();
});

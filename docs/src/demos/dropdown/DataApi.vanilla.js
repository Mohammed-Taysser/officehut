// 1. Attributes only: initAll() handles click, outside click, Esc and arrows.
//
//   <div class="dropdown">
//     <button class="btn dropdown-toggle" data-oh-toggle="dropdown"
//             data-oh-placement="bottom-start">Assign to</button>
//     <div class="dropdown-menu" role="menu">
//       <button class="dropdown-item" role="menuitem" tabindex="-1">Karim Fawzy</button>
//     </div>
//   </div>
//
// Options as attributes on the trigger: data-oh-placement, data-oh-offset,
// data-oh-auto-close="false".

// 2. Programmatic
import { initAll, getOrCreate, Dropdown, closeDropdowns } from 'officehut';

initAll();

const trigger = document.querySelector('[data-oh-toggle="dropdown"]');
const assign = getOrCreate(Dropdown, trigger, { placement: 'bottom-end' });

assign.show('first'); // open and focus the first item
assign.hide(true); // close and return focus to the trigger

assign.menu.addEventListener('click', (event) => {
  const item = event.target.closest('.dropdown-item');
  if (item) assignTicket('OPS-311', item.textContent.trim());
});

// Events fire on the trigger.
trigger.addEventListener('oh:show', () => loadAssignees());

// On a client-side route change:
closeDropdowns();

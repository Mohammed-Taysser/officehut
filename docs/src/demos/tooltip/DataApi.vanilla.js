// 1. Attributes only: initAll() handles hover (250ms delay), focus (instant) and Esc.
//
//   <button class="btn" data-oh-tooltip="Exports the filtered rows only">Export CSV</button>
//   <button class="btn" data-oh-tooltip="Shown below" data-oh-placement="bottom">…</button>
//
// Change the text by changing the attribute; it is read each time it shows.

// 2. Programmatic
import { initAll, bindTooltips, showTooltip, hideTooltip } from 'officehut';

initAll();
// …or, if you only want tooltips and nothing else:
const unbind = bindTooltips(document); // call unbind() to remove the listeners

const save = document.querySelector('#save-budget');
save.dataset.ohTooltip = 'Saved 2 minutes ago';

// Show one on demand, e.g. after a failed validation.
showTooltip(save, 'Fill in the cost centre first');
setTimeout(hideTooltip, 3000);

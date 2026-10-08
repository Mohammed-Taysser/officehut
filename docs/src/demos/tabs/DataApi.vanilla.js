// 1. Attributes only. initAll() finds `[data-oh-tabs]` lists on load and sets up
//    roles, tabindex and the arrow keys; clicks on data-oh-toggle="tab" select.
//
//   <div class="tabs" role="tablist" aria-label="Timesheet period" data-oh-tabs>
//     <button class="tab" role="tab" id="ts-tab-week" aria-controls="ts-week"
//             aria-selected="true" data-oh-toggle="tab">This week</button>
//     <button class="tab" role="tab" id="ts-tab-last" aria-controls="ts-last"
//             aria-selected="false" tabindex="-1" data-oh-toggle="tab">Last week</button>
//   </div>
//   <div class="tab-panel" role="tabpanel" id="ts-week">…</div>
//   <div class="tab-panel" role="tabpanel" id="ts-last" hidden>…</div>
//
// Add .tabs-folder or .tabs-segmented to the list for the other looks.

// 2. Programmatic
import { initAll, getOrCreate, Tabs } from 'officehut';

initAll();

const list = document.querySelector('[aria-label="Timesheet period"]');
const tabs = getOrCreate(Tabs, list); // needed for lists added after initAll()

tabs.select(document.querySelector('#ts-tab-last'));

// Cancelable: load the data first, then let the tab switch.
list.addEventListener('oh:change', (event) => {
  const panel = document.getElementById(
    event.detail.tab.getAttribute('aria-controls'),
  );
  if (!panel.dataset.loaded) loadTimesheet(panel);
});

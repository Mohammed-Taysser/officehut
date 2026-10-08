// The binder is layout only: a .binder grid around an ordinary tab list with
// .tabs-index. The same Tabs script that drives other tabs drives this one.
//
//   <div class="binder">
//     <div class="tabs tabs-index" role="tablist" aria-label="IT policy" data-oh-tabs>
//       <button class="tab" role="tab" id="itp-tab-scope" aria-controls="itp-scope"
//               aria-selected="true" data-oh-toggle="tab">Scope</button>
//       <button class="tab" role="tab" id="itp-tab-rules" aria-controls="itp-rules"
//               aria-selected="false" tabindex="-1" data-oh-toggle="tab">Rules</button>
//     </div>
//     <div class="tab-panel" role="tabpanel" id="itp-scope">…</div>
//     <div class="tab-panel" role="tabpanel" id="itp-rules" hidden>…</div>
//   </div>
//
// The tab list and the panels must be direct children of .binder.
import { initAll, getOrCreate, Tabs } from 'officehut';

initAll();

// Open the section named in the URL, e.g. /policies/it#rules
const list = document.querySelector('.binder .tabs-index');
const tab = document.getElementById(`itp-tab-${location.hash.slice(1)}`);
if (tab) getOrCreate(Tabs, list).select(tab);

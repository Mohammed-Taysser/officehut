import 'officehut/css';
import { initAll, getOrCreate, Collapse } from 'officehut';

// Every group toggle is a plain collapse trigger:
//   <button class="nav-link nav-toggle" data-oh-toggle="collapse"
//           data-oh-target="#demo-group-keys" aria-expanded="false">
// initAll() handles the clicks and keeps aria-expanded in sync.
initAll();

// Only one group open at a time? Give each group's .collapse a parent:
//   <div class="collapse" id="demo-group-keys" data-oh-parent=".sidebar-body">
// Or open the group holding the current page on load:
const current = document.querySelector('.sidebar [aria-current="page"]');
const group = current?.closest('.nav-group > .collapse');
if (group) getOrCreate(Collapse, group).show();

// `indeterminate` is a DOM property with no HTML attribute — set it from JS.
const all = document.querySelector('#week-41');
const rows = [...document.querySelectorAll('[data-timesheet]')];

function sync() {
  const n = rows.filter((r) => r.checked).length;
  all.checked = n === rows.length;
  all.indeterminate = n > 0 && n < rows.length;
}

all.addEventListener('change', () => {
  rows.forEach((r) => (r.checked = all.checked));
  sync();
});
rows.forEach((r) => r.addEventListener('change', sync));
sync();

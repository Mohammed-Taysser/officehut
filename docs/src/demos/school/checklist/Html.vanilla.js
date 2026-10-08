// No script is needed for the ticks: `.checklist-box:checked + .checklist-text`
// draws the pen tick and strikes the line through in CSS.
//
//   <ul class="checklist" aria-label="Before you go on leave">
//     <li class="checklist-item">
//       <label class="checklist-label">
//         <input type="checkbox" class="checklist-box" name="done" value="ooo">
//         <span class="checklist-text">Set your out-of-office reply</span>
//       </label>
//       <span class="checklist-meta is-late">2 days late</span>
//     </li>
//   </ul>
//
// Keep the checkbox directly before .checklist-text, or the strike-through stops working.

// Optional: remember what was ticked on this device.
const list = document.querySelector('.checklist');
const key = 'leave-checklist';
const saved = new Set(JSON.parse(localStorage.getItem(key) ?? '[]'));

for (const box of list.querySelectorAll('.checklist-box')) {
  box.checked = saved.has(box.value) || box.checked;
}

list.addEventListener('change', () => {
  const done = [...list.querySelectorAll('.checklist-box:checked')].map(
    (b) => b.value,
  );
  localStorage.setItem(key, JSON.stringify(done));
});

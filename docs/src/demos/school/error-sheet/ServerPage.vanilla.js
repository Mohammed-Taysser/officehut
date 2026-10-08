// The sheet is classes only, so a server template can render it without any
// JavaScript. Example (any template language):
//
//   <div role="alert" class="notebook notebook-holes error-sheet">
//     <h2 class="error-sheet-title">
//       <span class="notebook-margin" aria-hidden="true">✗</span>
//       We couldn't open this invoice
//     </h2>
//     <p class="error-sheet-remark">see me after class</p>
//     <p class="text-muted">Something broke on our side. The invoice itself is safe.</p>
//     <div class="error-sheet-actions">
//       <a class="btn btn-dark btn-sm" href="/invoices">Back to invoices</a>
//       <button class="btn btn-sm btn-outline" type="button" data-reload hidden>Reload page</button>
//     </div>
//     <details class="error-sheet-detail">
//       <summary>what the computer said</summary>
//       <pre>{{ status }} {{ statusText }} · ref {{ requestId }}</pre>
//     </details>
//   </div>
//
// Needs notebook.css, button.css and error.css (or the full bundle).

// Optional: show a Reload button only when scripts are running.
const reload = document.querySelector('[data-reload]');
if (reload) {
  reload.hidden = false;
  reload.addEventListener('click', () => location.reload());
}

// For a small inline failure, the slip is classes only too:
//   <div role="alert" class="error-slip">
//     <span class="handwriting">✗ oops</span>
//     <span class="flex-1">This part couldn't be shown.</span>
//   </div>

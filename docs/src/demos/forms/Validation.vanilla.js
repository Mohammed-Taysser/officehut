// Let the browser validate, then mirror its verdict into aria-invalid and the
// error line — the CSS styles `[aria-invalid="true"]` the same as `.is-invalid`.
const input = document.querySelector('#vat');
const error = document.querySelector('#vat-error');

input.pattern = '\\d{3}-\\d{3}-\\d{3}';

input.addEventListener('blur', () => {
  const ok = input.checkValidity();
  input.setAttribute('aria-invalid', String(!ok));
  input.classList.toggle('is-valid', ok);
  error.hidden = ok;
  error.textContent = ok ? '' : 'Use the format 123-456-789.';
});

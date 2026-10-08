// Plain HTML for a server-rendered 500 page: no React, no framework.
// The buttons are links, so it works even when the scripts failed to load.
export default function ServerPage() {
  return (
    <div role='alert' className='notebook notebook-holes error-sheet'>
      <h2 className='error-sheet-title'>
        <span className='notebook-margin' aria-hidden='true'>
          ✗
        </span>
        We couldn&apos;t open this invoice
      </h2>
      <p className='error-sheet-remark'>see me after class</p>
      <p className='text-muted'>
        Something broke on our side. The invoice itself is safe.
      </p>
      <div className='error-sheet-actions'>
        <a className='btn btn-dark btn-sm' href='#invoices'>
          Back to invoices
        </a>
        <a
          className='btn btn-sm btn-outline'
          href='mailto:it@example.com?subject=Error%20ref%20E-7F3A'
        >
          Tell IT
        </a>
      </div>
      <details className='error-sheet-detail'>
        <summary>what the computer said</summary>
        <pre>500 Internal Server Error · ref E-7F3A · 2026-10-08 09:14</pre>
      </details>
    </div>
  );
}

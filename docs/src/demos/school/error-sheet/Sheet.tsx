import { useState } from 'react';
import { ErrorBoundary } from 'officehut/react';

function PayrollSummary() {
  const [broken, setBroken] = useState(false);
  if (broken) throw new Error('Payroll period 2026-10 has no closing date');
  return (
    <div className='card'>
      <div className='card-body stack gap-2'>
        <h3 className='card-title'>Payroll · October</h3>
        <p className='tabular-nums'>142 employees · EGP 3.48m gross</p>
        <p>
          <button
            type='button'
            className='btn btn-sm btn-outline'
            onClick={() => setBroken(true)}
          >
            Simulate a crash
          </button>
        </p>
      </div>
    </div>
  );
}

// Around a whole page (or route): the default fallback is the full sheet.
// "Try again" resets the boundary and remounts the page.
export default function Sheet() {
  return (
    <ErrorBoundary
      onError={(error) => console.warn('[report to your logger]', error)}
    >
      <PayrollSummary />
    </ErrorBoundary>
  );
}

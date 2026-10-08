import { useState } from 'react';
import { Card, ErrorBoundary } from 'officehut/react';

// A widget that crashes while rendering once you press the button.
// (Errors thrown in event handlers aren't caught by boundaries, so it sets
// state and throws on the next render.)
function SpendByTeam() {
  const [broken, setBroken] = useState(false);
  if (broken)
    throw new Error("Cannot read properties of undefined (reading 'total')");
  return (
    <div className='stack gap-2'>
      <p className='tabular-nums'>Sales EGP 42k · Ops EGP 31k · HR EGP 9k</p>
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
  );
}

// One broken widget on a dashboard: the slip replaces it, the rest stays.
export default function Slip() {
  return (
    <div className='grid cols-1 cols-md-2 gap-4'>
      <Card size='sm' title='Spend by team'>
        <ErrorBoundary variant='slip'>
          <SpendByTeam />
        </ErrorBoundary>
      </Card>
      <Card size='sm' title='Open purchase orders'>
        <p className='fs-2xl fw-bold tabular-nums'>14</p>
        <p className='text-subtle fs-sm'>3 waiting for approval</p>
      </Card>
    </div>
  );
}

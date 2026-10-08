import { lazy, Suspense, useState, type ComponentType } from 'react';
import { Grade, Notebook, PencilLoader } from 'officehut/react';

function Report() {
  return (
    <Notebook>
      <h3>Q3 report · Finance</h3>
      <p>Revenue up 12% on Q2. Costs flat. Cash covers 7 months of payroll.</p>
      <p className='d-flex align-items-center gap-3'>
        Audit readiness{' '}
        <Grade
          value='A-'
          size='sm'
          pen='green'
          label='Audit readiness: A minus'
        />
      </p>
    </Notebook>
  );
}

// Pretend the report page is a slow, code-split route.
const slow = (): ComponentType =>
  lazy(
    () =>
      new Promise<{ default: ComponentType }>((resolve) =>
        setTimeout(() => resolve({ default: Report }), 2200),
      ),
  );

// As the Suspense fallback for a whole page, centred in the content area.
export default function PageLoader() {
  const [Page, setPage] = useState(slow);
  return (
    <div className='stack gap-3'>
      <div className='d-grid place-items-center' style={{ minHeight: 240 }}>
        <Suspense
          fallback={<PencilLoader size='lg' label='Opening the Q3 report' />}
        >
          <Page />
        </Suspense>
      </div>
      <p className='text-center'>
        <button
          type='button'
          className='btn btn-sm'
          onClick={() => setPage(slow)}
        >
          Open it again
        </button>
      </p>
    </div>
  );
}

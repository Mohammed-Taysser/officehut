export default function Colors() {
  return (
    <div className='stack gap-3'>
      <p>
        <span className='text-success fw-medium'>Paid on time</span> ·{' '}
        <span className='text-danger fw-medium'>3 days late</span> ·{' '}
        <span className='text-muted'>muted</span> ·{' '}
        <span className='text-subtle'>subtle</span>
      </p>
      <div className='cluster'>
        <span className='bg-primary px-3 py-1 rounded'>.bg-primary</span>
        <span className='bg-warning-soft px-3 py-1 rounded'>
          .bg-warning-soft
        </span>
        <span className='bg-sunken px-3 py-1 rounded'>.bg-sunken</span>
        <span className='border border-danger px-3 py-1 rounded'>
          .border-danger
        </span>
      </div>
    </div>
  );
}

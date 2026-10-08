const cell = 'border rounded p-2 bg-surface fs-sm';

export default function Responsive() {
  return (
    <div className='row g-3'>
      <div className='col-12 col-md-6 col-lg-3'>
        <div className={cell}>Open tickets</div>
      </div>
      <div className='col-12 col-md-6 col-lg-3'>
        <div className={cell}>Due this week</div>
      </div>
      <div className='col-12 col-md-6 col-lg-3'>
        <div className={cell}>Overdue</div>
      </div>
      <div className='col-12 col-md-6 col-lg-3'>
        <div className={cell}>Closed today</div>
      </div>
    </div>
  );
}

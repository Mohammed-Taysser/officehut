// The markup toast() builds, shown in place. Write it yourself for a
// server-rendered flash message; data-oh-dismiss closes it.
export default function Static() {
  return (
    <div className='stack gap-2' style={{ maxWidth: '22rem' }}>
      <div
        className='toast toast-success'
        role='status'
        style={{ animation: 'none' }}
      >
        <div className='toast-body'>
          <p className='toast-title'>Timesheet submitted</p>
          <div className='toast-text'>
            Week 41 went to Mona Adel for approval.
          </div>
        </div>
        <button
          type='button'
          className='btn-close'
          aria-label='Close'
          data-oh-dismiss='toast'
        />
      </div>
      <div
        className='toast toast-warning'
        role='status'
        style={{ animation: 'none' }}
      >
        <div className='toast-body'>
          <div className='toast-text'>Your session ends in 5 minutes.</div>
          <button type='button' className='btn btn-sm btn-link px-0 mt-1'>
            Stay signed in
          </button>
        </div>
        <button
          type='button'
          className='btn-close'
          aria-label='Close'
          data-oh-dismiss='toast'
        />
      </div>
    </div>
  );
}

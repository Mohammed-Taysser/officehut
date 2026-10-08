// Plain HTML with the data API: a close button with data-oh-dismiss
// removes the closest .alert. The React version is just <Alert dismissible>.
export default function Dismissible() {
  return (
    <div className='stack gap-2'>
      <div className='alert alert-info' role='status' id='alert-welcome'>
        <div className='alert-body'>
          <p className='alert-title'>Welcome to the new expense form</p>
          Your drafts from the old form were moved over.
        </div>
        <button
          type='button'
          className='btn-close'
          aria-label='Dismiss'
          data-oh-dismiss='alert'
        />
      </div>
      <div className='alert alert-note alert-success' role='status'>
        <div className='alert-body'>Room 4B is booked for Thursday 10:00.</div>
        <button
          type='button'
          className='btn-close'
          aria-label='Dismiss'
          data-oh-dismiss=''
        />
      </div>
    </div>
  );
}

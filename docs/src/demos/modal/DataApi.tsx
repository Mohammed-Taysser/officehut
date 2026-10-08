// Plain HTML: data-oh-toggle="modal" opens the <dialog>; data-oh-dismiss="modal" closes it.
export default function DataApi() {
  return (
    <>
      <button
        type='button'
        className='btn btn-primary'
        data-oh-toggle='modal'
        data-oh-target='#new-vendor'
      >
        Add vendor
      </button>
      <dialog
        className='modal'
        id='new-vendor'
        aria-labelledby='new-vendor-title'
      >
        <div className='modal-header'>
          <h2 className='modal-title' id='new-vendor-title'>
            Add vendor
          </h2>
          <button
            type='button'
            className='btn-close'
            aria-label='Close'
            data-oh-dismiss='modal'
          />
        </div>
        <div className='modal-body'>
          <p>
            Finance checks the bank details before the first payment. This takes
            one working day.
          </p>
        </div>
        <div className='modal-footer'>
          <button
            type='button'
            className='btn btn-ghost'
            data-oh-dismiss='modal'
          >
            Cancel
          </button>
          <button
            type='button'
            className='btn btn-primary'
            data-oh-dismiss='modal'
          >
            Continue
          </button>
        </div>
      </dialog>
    </>
  );
}

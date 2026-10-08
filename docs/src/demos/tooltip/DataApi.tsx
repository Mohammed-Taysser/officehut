// Plain HTML: one attribute. initAll() listens for hover and focus on document.
export default function DataApi() {
  return (
    <div className='cluster gap-3'>
      <button
        type='button'
        className='btn'
        data-oh-tooltip='Exports the filtered rows only'
      >
        Export CSV
      </button>
      <button
        type='button'
        className='btn'
        data-oh-tooltip='Shown below'
        data-oh-placement='bottom'
      >
        Placement bottom
      </button>
      <span>
        Net 30{' '}
        <button
          type='button'
          className='btn btn-sm btn-ghost btn-icon'
          aria-label='What does Net 30 mean?'
          data-oh-tooltip='Payment is due 30 days after the invoice date'
        >
          ?
        </button>
      </span>
    </div>
  );
}

// Plain HTML: initAll() handles the click and keeps aria-expanded in sync.
export default function DataApi() {
  return (
    <div className='stack gap-2' style={{ maxWidth: 480 }}>
      <button
        type='button'
        className='btn'
        data-oh-toggle='collapse'
        data-oh-target='#vendor-notes'
        aria-expanded='false'
        aria-controls='vendor-notes'
      >
        Vendor notes
      </button>
      <div className='collapse' id='vendor-notes'>
        <div>
          <p className='border rounded p-3 bg-surface'>
            Nile Office Supplies deliver on Tuesdays only. Ask for Hassan at the
            loading bay.
          </p>
        </div>
      </div>
    </div>
  );
}

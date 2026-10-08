export default function Paper() {
  return (
    <div className='grid cols-1 cols-md-3'>
      <div
        className='bg-surface bg-ruled border rounded p-3'
        style={{ lineHeight: '1.5rem' }}
      >
        <strong>.bg-ruled</strong>
        <br />
        Notebook lines behind a note.
      </div>
      <div className='bg-surface bg-grid border rounded p-3'>
        <strong>.bg-grid</strong>
        <br />
        Graph paper for empty canvases.
      </div>
      <div className='stack gap-2'>
        <div className='bg-surface border rounded p-2 elev-1'>
          .elev-1 · paper edge
        </div>
        <div className='bg-surface border rounded p-2 elev-2'>
          .elev-2 · two sheets
        </div>
        <div className='bg-surface border rounded p-2 elev-float'>
          .elev-float · lifted
        </div>
      </div>
    </div>
  );
}

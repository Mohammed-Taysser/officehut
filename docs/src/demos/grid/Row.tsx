const cell = 'border rounded p-2 bg-surface fs-sm';

export default function Row() {
  return (
    <div className='stack gap-3'>
      <div className='row'>
        <div className='col'>
          <div className={cell}>.col</div>
        </div>
        <div className='col'>
          <div className={cell}>.col</div>
        </div>
        <div className='col'>
          <div className={cell}>.col</div>
        </div>
      </div>
      <div className='row'>
        <div className='col-8'>
          <div className={cell}>.col-8 · invoice lines</div>
        </div>
        <div className='col-4'>
          <div className={cell}>.col-4 · totals</div>
        </div>
      </div>
      <div className='row'>
        <div className='col-auto'>
          <div className={cell}>.col-auto</div>
        </div>
        <div className='col'>
          <div className={cell}>.col takes the rest</div>
        </div>
      </div>
    </div>
  );
}

const cell = 'border rounded p-2 bg-surface fs-sm';

export default function Offset() {
  return (
    <div className='row gy-3'>
      <div className='col-md-6 offset-md-3'>
        <div className={cell}>.col-md-6 .offset-md-3 · a centred form</div>
      </div>
      <div className='col-4 offset-8'>
        <div className={cell}>.offset-8 · signature</div>
      </div>
    </div>
  );
}

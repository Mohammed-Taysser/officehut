// The same page in plain HTML: no JavaScript involved.
export default function Html() {
  return (
    <div className='notebook notebook-holes' style={{ maxWidth: 560 }}>
      <h3>
        <span className='notebook-margin' aria-hidden='true'>
          2.
        </span>
        Fire drill, Building A
      </h3>
      <p>
        Assembly point is the car park by gate 2. Wardens wear the orange vests.
      </p>
      <p className='notebook-check'>
        Floor 3 cleared in 4 minutes{' '}
        <span className='visually-hidden'>(done)</span>
      </p>
      <p>
        <span className='handwriting text-danger'>Next drill: January.</span>
      </p>
    </div>
  );
}

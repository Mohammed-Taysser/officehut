export default function Memo() {
  return (
    <div className='notebook notebook-holes' style={{ maxWidth: 600 }}>
      <h2>
        <span className='notebook-margin' aria-hidden>
          14/10
        </span>
        Minutes: facilities weekly
      </h2>
      <p className='text-muted'>
        Present: Mona, Karim, Laila. Apologies: Omar.
      </p>
      <ol>
        <li>Third-floor printer is replaced on Thursday.</li>
        <li className='notebook-check'>Parking permits renewed for Q4.</li>
        <li>
          Kitchen rota starts next week{' '}
          <span className='handwriting text-danger'>— ask Omar!</span>
        </li>
      </ol>
    </div>
  );
}

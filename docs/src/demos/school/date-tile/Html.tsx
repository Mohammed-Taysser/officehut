// Plain HTML: write the names yourself and put the full date in aria-label.
export default function Html() {
  return (
    <time
      className='date-tile date-tile-blue'
      dateTime='2026-11-02'
      aria-label='Monday, 2 November 2026'
    >
      <span className='date-tile-month' aria-hidden='true'>
        Nov
      </span>
      <span className='date-tile-day' aria-hidden='true'>
        2
      </span>
      <span className='date-tile-weekday' aria-hidden='true'>
        Mon
      </span>
    </time>
  );
}

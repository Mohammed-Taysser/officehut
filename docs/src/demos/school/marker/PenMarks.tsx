import { Marker } from 'officehut/react';

// A manager's pen marks on a written self-review.
export default function PenMarks() {
  return (
    <ul className='stack gap-3' style={{ maxWidth: 620 }}>
      <li>
        <Marker variant='underline'>Closed 41 support tickets</Marker> in
        September, the most on the team.
      </li>
      <li>
        Migrated the supplier list to the new system,{' '}
        <Marker variant='wavy'>mostly on time</Marker>.
      </li>
      <li>
        Saved <Marker variant='double'>EGP 38,000</Marker> on the cleaning
        contract renewal.
      </li>
      <li>
        Next goal: <Marker variant='circle'>mentor</Marker> the two new hires.
      </li>
      <li>
        <Marker variant='strike'>Learn Power BI</Marker> — moved to next year.
      </li>
    </ul>
  );
}

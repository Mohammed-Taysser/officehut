import { Marker } from 'officehut/react';

// Pen colour: red (default), blue ballpoint or pencil.
export default function Pens() {
  return (
    <div className='stack gap-3'>
      <p>
        <Marker variant='underline'>Red pen</Marker> ·{' '}
        <Marker variant='underline' pen='blue'>
          blue pen
        </Marker>{' '}
        ·{' '}
        <Marker variant='underline' pen='pencil'>
          pencil
        </Marker>
      </p>
      <p>
        Total due:{' '}
        <Marker variant='circle' pen='blue'>
          EGP 5,768.40
        </Marker>
      </p>
      <p>
        Meeting moved to{' '}
        <Marker variant='strike' pen='pencil'>
          Tuesday
        </Marker>{' '}
        Wednesday.
      </p>
    </div>
  );
}

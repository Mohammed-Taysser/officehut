import { Card } from 'officehut/react';

const rooms = [
  'Room 2A',
  'Room 4B',
  'Boardroom',
  'Phone booth 1',
  'Phone booth 2',
  'Training room',
];

export default function CssGrid() {
  return (
    <div className='grid cols-1 cols-sm-2 cols-lg-3'>
      {rooms.map((room, i) => (
        <Card
          key={room}
          size='sm'
          className={i === 2 ? 'span-sm-2 span-lg-1' : undefined}
        >
          <Card.Body>
            <p className='fw-medium'>{room}</p>
            <p className='text-subtle fs-sm'>
              {i % 2 ? 'Booked until 15:00' : 'Free now'}
            </p>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

import { Badge, Card, Marker, Sticky } from 'officehut/react';

// A draft with reviewers' comments stuck beside the paragraphs they refer to.
export default function Review() {
  return (
    <div className='grid cols-1 cols-md-3 gap-5 align-items-start'>
      <Card as='article' className='span-md-2'>
        <Card.Header>
          <Card.Title>Travel policy 2027 · draft 3</Card.Title>
          <Card.Actions>
            <Badge color='warning'>In review</Badge>
          </Card.Actions>
        </Card.Header>
        <Card.Body className='stack gap-3'>
          <p>
            <strong>3.1 Booking.</strong> Flights are booked through the travel
            desk at least <Marker>14 days</Marker> before departure. Late
            bookings need a line manager&apos;s approval.
          </p>
          <p>
            <strong>3.2 Class of travel.</strong> Economy for flights under six
            hours. Business class for longer flights when the traveller works on
            arrival.
          </p>
          <p>
            <strong>3.3 Per diem.</strong> The daily allowance is{' '}
            <Marker color='pink'>EGP 1,200</Marker> inside Egypt and USD 75
            abroad, paid with the next salary.
          </p>
        </Card.Body>
      </Card>
      <div className='stack gap-5'>
        <Sticky
          as='aside'
          hand
          taped
          aria-label='Comment from Mona Adel on 3.1'
        >
          <span className='text-subtle'>Mona · 3.1</span>
          <br />
          14 days is tight for visas. Make it 21?
        </Sticky>
        <Sticky
          as='aside'
          color='pink'
          hand
          aria-label='Comment from Karim Fawzy on 3.3'
        >
          <span className='text-subtle'>Karim · 3.3</span>
          <br />
          Finance confirmed this figure on 2 Oct.
        </Sticky>
      </div>
    </div>
  );
}

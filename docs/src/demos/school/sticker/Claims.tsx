import { Badge, Card, Sticker } from 'officehut/react';

const CLAIMS = [
  {
    no: 'EXP-1182',
    who: 'Karim Fawzy',
    what: 'Taxi to the airport',
    amount: '420.00',
    approved: true,
  },
  {
    no: 'EXP-1185',
    who: 'Mona Adel',
    what: 'Client lunch, 4 people',
    amount: '1,860.00',
    approved: false,
  },
];

// The sticker is the fun part; the badge says the same thing for everyone.
export default function Claims() {
  return (
    <div className='grid cols-1 cols-md-2 gap-5'>
      {CLAIMS.map((c) => (
        <Card key={c.no}>
          <Card.Body className='d-flex align-items-start gap-3'>
            <div className='flex-1 stack gap-1'>
              <span className='eyebrow font-mono'>{c.no}</span>
              <p className='fw-medium'>{c.what}</p>
              <p className='text-subtle fs-sm'>{c.who}</p>
              <p className='font-mono tabular-nums'>EGP {c.amount}</p>
              <p>
                <Badge color={c.approved ? 'success' : 'warning'}>
                  {c.approved ? 'Approved' : 'Waiting for manager'}
                </Badge>
              </p>
            </div>
            {c.approved && (
              <Sticker color='success' aria-hidden>
                Approved
              </Sticker>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

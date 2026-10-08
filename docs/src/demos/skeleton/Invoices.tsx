import { Card, Skeleton } from 'officehut/react';

export default function Invoices() {
  return (
    <Card
      style={{ maxWidth: 520 }}
      aria-busy='true'
      aria-label='Recent invoices, loading'
    >
      <Card.Header>
        <Card.Title>Recent invoices</Card.Title>
      </Card.Header>
      <Card.Body className='stack gap-3'>
        {[62, 48, 70, 55].map((w, i) => (
          <div key={i} className='hstack gap-3'>
            <Skeleton variant='circle' width='2rem' />
            <div className='flex-1'>
              <Skeleton width={`${w}%`} height='0.6rem' />
              <Skeleton width='30%' height='0.5rem' className='mt-2' />
            </div>
            <Skeleton width='4.5rem' height='0.7rem' />
          </div>
        ))}
      </Card.Body>
    </Card>
  );
}

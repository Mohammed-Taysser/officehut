import { Card, Ribbon } from 'officehut/react';

export default function Basic() {
  return (
    <Card style={{ maxWidth: 340 }}>
      <Ribbon color='success'>Paid</Ribbon>
      <Card.Body>
        <span className='eyebrow font-mono'>INV-2026-0418</span>
        <Card.Title className='mt-1'>Nile Freight Co.</Card.Title>
        <p className='font-mono tabular-nums fs-lg'>EGP 18,450.00</p>
        <p className='text-subtle fs-sm'>Paid by transfer on 3 Oct</p>
      </Card.Body>
    </Card>
  );
}

import { Badge, Card } from 'officehut/react';

// A paper clip means "something is attached": receipts on an expense claim.
export default function Clipped() {
  return (
    <div className='grid cols-1 cols-md-2 gap-6' style={{ paddingTop: '1rem' }}>
      <Card clipped>
        <Card.Body className='stack gap-1'>
          <span className='eyebrow font-mono'>EXP-1190 · 3 receipts</span>
          <p className='fw-medium'>Alexandria site visit</p>
          <p className='font-mono tabular-nums'>EGP 2,415.00</p>
          <p>
            <Badge color='warning'>Waiting for finance</Badge>
          </p>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body className='stack gap-1'>
          <span className='eyebrow font-mono'>EXP-1191 · no receipts</span>
          <p className='fw-medium'>Team coffee</p>
          <p className='font-mono tabular-nums'>EGP 180.00</p>
          <p>
            <Badge color='danger'>Receipt missing</Badge>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}

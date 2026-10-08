import { Badge, Card } from 'officehut/react';

export default function Paper() {
  return (
    <div className='grid cols-1 cols-md-2 gap-6'>
      <Card stacked>
        <Card.Body>
          <span className='eyebrow'>Batch · 14 receipts</span>
          <Card.Title className='mt-1'>September expenses</Card.Title>
          <p className='card-text'>
            Stacked cards hint that there is more underneath.
          </p>
        </Card.Body>
      </Card>

      <Card tab='Contracts' tabColor='aurora'>
        <Card.Body>
          <div className='d-flex align-items-center gap-2'>
            <Card.Title className='m-0'>Vendor agreements</Card.Title>
            <Badge variant='outline' className='ms-auto'>
              7 files
            </Badge>
          </div>
          <p className='card-text mt-2'>
            A folder tab labels the drawer the card came from.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}

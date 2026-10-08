import { Card, Ribbon } from 'officehut/react';

export default function Placements() {
  return (
    <div className='grid cols-1 cols-md-3 gap-6'>
      <Card>
        <Ribbon>Draft</Ribbon>
        <Card.Body>
          <p className='fw-medium'>Corner (end)</p>
          <p className='text-subtle fs-sm'>Default. Plain masking tape.</p>
        </Card.Body>
      </Card>
      <Card>
        <Ribbon placement='start' color='info'>
          New
        </Ribbon>
        <Card.Body className='text-end'>
          <p className='fw-medium'>Corner (start)</p>
          <p className='text-subtle fs-sm'>Flips with the text direction.</p>
        </Card.Body>
      </Card>
      <Card>
        <Ribbon placement='top' color='aurora'>
          Pinned
        </Ribbon>
        <Card.Body>
          <p className='fw-medium'>Top edge</p>
          <p className='text-subtle fs-sm'>
            A short strip holding the note to the board.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}

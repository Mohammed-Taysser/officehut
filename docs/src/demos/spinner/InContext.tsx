import { Button, Card, Spinner } from 'officehut/react';

export default function InContext() {
  return (
    <Card style={{ maxWidth: 420 }}>
      <Card.Body className='hstack align-items-start gap-3'>
        <Spinner color='info' label='Reconciling' />
        <div>
          <p className='fw-semibold'>
            Reconciling September with NBE statement
          </p>
          <p className='text-subtle fs-sm'>
            1,284 of 2,016 lines matched. You can leave this page — we'll email
            Mona when it's done.
          </p>
        </div>
      </Card.Body>
      <Card.Footer>
        <Button size='sm' variant='ghost'>
          Cancel
        </Button>
        <Button size='sm' color='primary' loading className='ms-auto'>
          Export
        </Button>
      </Card.Footer>
    </Card>
  );
}

import { useState } from 'react';
import { Alert, Badge, Button, Card } from 'officehut/react';

export default function Timesheet() {
  const [shown, setShown] = useState(true);
  return (
    <div className='stack gap-3' style={{ maxWidth: 600 }}>
      {shown && (
        <Alert
          color='info'
          variant='note'
          dismissible
          onDismiss={() => setShown(false)}
        >
          Public holiday on Monday 6 October. It is already filled in as 8
          hours.
        </Alert>
      )}
      <Card>
        <Card.Header>
          <Card.Title>Week 41 · Karim Fawzy</Card.Title>
          <Card.Actions>
            <Badge color='warning'>Draft</Badge>
          </Card.Actions>
        </Card.Header>
        <Card.Body className='stack gap-3'>
          <p className='tabular-nums'>
            Mon 8.0 · Tue 7.5 · Wed 9.0 · Thu 8.0 · Fri 4.0
          </p>
          <Alert
            color='danger'
            size='sm'
            icon
            title='Friday is short by 4 hours'
          >
            Add leave or overtime from another day before submitting.
          </Alert>
        </Card.Body>
        <Card.Footer>
          <Button size='sm' color='primary' className='ms-auto' disabled>
            Submit
          </Button>
        </Card.Footer>
      </Card>
      {!shown && (
        <Button size='sm' variant='link' onClick={() => setShown(true)}>
          Show the holiday note again
        </Button>
      )}
    </div>
  );
}

import { Badge, Button, Card } from 'officehut/react';

export default function Basic() {
  return (
    <Card style={{ maxWidth: 380 }}>
      <Card.Header>
        <Card.Title>Leave request</Card.Title>
        <Card.Actions>
          <Badge color='warning'>Pending</Badge>
        </Card.Actions>
      </Card.Header>
      <Card.Body>
        <p className='card-text'>
          Salma Nour asked for <strong>3 days</strong> off, 21–23 October. Her
          tasks are covered by Omar.
        </p>
      </Card.Body>
      <Card.Footer>
        <Button size='sm' variant='ghost'>
          Decline
        </Button>
        <Button size='sm' color='success' className='ms-auto'>
          Approve
        </Button>
      </Card.Footer>
    </Card>
  );
}

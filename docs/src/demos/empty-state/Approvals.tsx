import { useState } from 'react';
import { Button, Card, Chip, ChipList, EmptyState } from 'officehut/react';

export default function Approvals() {
  const [filters, setFilters] = useState([
    { key: 'Assigned to', value: 'Me' },
    { key: 'Type', value: 'Purchase orders' },
  ]);
  return (
    <Card style={{ maxWidth: 640 }}>
      <Card.Header>
        <Card.Title>Approvals</Card.Title>
        <Card.Actions>
          <Button size='sm' variant='ghost'>
            History
          </Button>
        </Card.Actions>
      </Card.Header>
      <Card.Body>
        <ChipList aria-label='Active filters'>
          {filters.map((f) => (
            <Chip
              key={f.key}
              label={f.key}
              onRemove={() => setFilters((all) => all.filter((x) => x !== f))}
            >
              {f.value}
            </Chip>
          ))}
        </ChipList>
        <EmptyState
          className='mt-2'
          title='No purchase orders need you'
          note='Back to the real work.'
          actions={
            <Button size='sm' variant='soft' color='primary'>
              Show all types
            </Button>
          }
        >
          Karim approved the last one at 10:42 this morning.
        </EmptyState>
      </Card.Body>
    </Card>
  );
}

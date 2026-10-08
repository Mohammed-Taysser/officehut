import { IconFilter } from '@tabler/icons-react';
import { Badge, Button, Card, Collapse, useDisclosure } from 'officehut/react';

const tickets = [
  { id: 'OPS-311', title: 'Printer on 3rd floor jams', state: 'Open' },
  { id: 'OPS-309', title: 'Renew parking permits', state: 'Open' },
  { id: 'OPS-302', title: 'New hire laptop ready', state: 'Closed' },
];

export default function Filters() {
  const filters = useDisclosure();
  return (
    <Card style={{ maxWidth: 560 }}>
      <Card.Header>
        <Card.Title>Facilities tickets</Card.Title>
        <Card.Actions>
          <Button
            size='sm'
            variant='ghost'
            icon={<IconFilter />}
            aria-expanded={filters.open}
            aria-controls='ticket-filters'
            onClick={filters.onToggle}
          >
            Filters
          </Button>
        </Card.Actions>
      </Card.Header>
      <Collapse open={filters.open} id='ticket-filters'>
        <div className='cluster px-4 py-3 bg-sunken border-bottom'>
          <span className='fs-sm text-muted'>Status</span>
          <Button size='sm' aria-pressed>
            Open
          </Button>
          <Button size='sm'>Closed</Button>
          <span className='fs-sm text-muted ms-3'>Floor</span>
          <Button size='sm'>2</Button>
          <Button size='sm'>3</Button>
        </div>
      </Collapse>
      <Card.Body className='stack gap-2'>
        {tickets.map((t) => (
          <div key={t.id} className='hstack'>
            <code className='fs-xs'>{t.id}</code>
            <span>{t.title}</span>
            <Badge
              color={t.state === 'Open' ? 'warning' : 'secondary'}
              className='ms-auto'
            >
              {t.state}
            </Badge>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
}

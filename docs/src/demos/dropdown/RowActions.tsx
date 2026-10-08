import { IconDots } from '@tabler/icons-react';
import { Badge, Button, Card, Dropdown } from 'officehut/react';

const vendors = [
  {
    name: 'Nile Office Supplies',
    due: '3,450.00',
    state: 'warning',
    label: 'Due Fri',
  },
  {
    name: 'CleanCo Services',
    due: '12,000.00',
    state: 'danger',
    label: 'Overdue',
  },
  { name: 'Delta Water', due: '640.00', state: 'success', label: 'Paid' },
] as const;

export default function RowActions() {
  return (
    <Card style={{ maxWidth: 560 }}>
      <Card.Header>
        <Card.Title>Vendor payments</Card.Title>
      </Card.Header>
      <Card.Body className='stack gap-3'>
        {vendors.map((v) => (
          <div key={v.name} className='hstack'>
            <span className='fw-medium'>{v.name}</span>
            <span className='ms-auto tabular-nums'>{v.due}</span>
            <Badge color={v.state}>{v.label}</Badge>
            <Dropdown
              placement='bottom-end'
              aria-label={`Actions for ${v.name}`}
              trigger={
                <Button
                  size='sm'
                  variant='ghost'
                  iconOnly
                  aria-label={`Actions for ${v.name}`}
                >
                  <IconDots />
                </Button>
              }
            >
              <Dropdown.Item>Record payment</Dropdown.Item>
              <Dropdown.Item>Send reminder</Dropdown.Item>
              <Dropdown.Item>Open vendor file</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item danger>Put on hold</Dropdown.Item>
            </Dropdown>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
}

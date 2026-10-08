import { Alert, Avatar, Badge, Button, Card, Tabs } from 'officehut/react';

export default function Desk() {
  return (
    <div className='grid cols-1 cols-md-2 gap-6'>
      <Card tab='Timesheets' tabColor='aurora'>
        <Card.Body className='stack gap-3'>
          <div className='hstack'>
            <Avatar name='Salma Nour' circle />
            <div className='min-w-0'>
              <p className='fw-medium'>Salma Nour</p>
              <p className='text-subtle fs-sm'>Week 41 · 38.5 hours</p>
            </div>
            <Badge color='success' variant='stamp' className='ms-auto'>
              Approved
            </Badge>
          </div>
          <Alert color='warning' size='sm'>
            Two entries were added after the Friday cut-off.
          </Alert>
        </Card.Body>
      </Card>

      <Card stacked>
        <Tabs defaultValue='open'>
          <Card.Header>
            <Tabs.List variant='segmented' aria-label='Ticket filter'>
              <Tabs.Tab value='open'>Open</Tabs.Tab>
              <Tabs.Tab value='mine'>Mine</Tabs.Tab>
            </Tabs.List>
          </Card.Header>
          <Card.Body>
            <Tabs.Panel value='open' className='pt-0'>
              <p className='fw-medium'>OPS-311 · Printer on 3rd floor jams</p>
              <p className='text-subtle fs-sm'>
                Facilities · opened 2 hours ago
              </p>
            </Tabs.Panel>
            <Tabs.Panel value='mine' className='pt-0'>
              <p className='text-muted'>
                Nothing assigned to you. Enjoy the quiet.
              </p>
            </Tabs.Panel>
          </Card.Body>
          <Card.Footer>
            <Button size='sm' color='primary' className='ms-auto'>
              New ticket
            </Button>
          </Card.Footer>
        </Tabs>
      </Card>
    </div>
  );
}

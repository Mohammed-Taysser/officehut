import { Badge, Card, Timetable } from 'officehut/react';

// A new hire's first week, on the onboarding page.
export default function Training() {
  return (
    <Card style={{ maxWidth: 820 }}>
      <Card.Header>
        <div>
          <Card.Title>First week · Youssef Ali</Card.Title>
          <p className='text-subtle fs-sm'>
            Finance team · starts Sunday 11 October
          </p>
        </div>
        <Card.Actions>
          <Badge color='success'>Laptop ready</Badge>
        </Card.Actions>
      </Card.Header>
      <Card.Body>
        <Timetable
          caption='Onboarding schedule for Youssef Ali'
          days={['Sun', 'Mon', 'Tue', 'Wed', 'Thu']}
          slots={['09:00', '11:00', '13:00', '15:00']}
          today={0}
          entries={[
            {
              day: 0,
              slot: 0,
              title: 'Welcome & badge',
              meta: 'Reception',
              color: 'aurora',
            },
            {
              day: 0,
              slot: 1,
              span: 2,
              title: 'IT setup',
              meta: 'Omar · room 2C',
              color: 'info',
            },
            { day: 0, slot: 3, title: 'Lunch with team', free: true },
            {
              day: 1,
              slot: 0,
              span: 2,
              title: 'Ledger training',
              meta: 'Laila',
              color: 'primary',
            },
            {
              day: 1,
              slot: 2,
              span: 2,
              title: 'Shadow AP desk',
              meta: 'Karim',
              color: 'secondary',
            },
            {
              day: 2,
              slot: 0,
              title: 'Fire safety',
              meta: 'Facilities',
              color: 'danger',
            },
            {
              day: 2,
              slot: 1,
              span: 3,
              title: 'Shadow AR desk',
              meta: 'Mona',
              color: 'secondary',
            },
            {
              day: 3,
              slot: 0,
              span: 4,
              title: 'Month-end close',
              meta: 'whole team',
              color: 'warning',
            },
            {
              day: 4,
              slot: 0,
              title: 'Check-in',
              meta: 'manager 1:1',
              color: 'success',
            },
            { day: 4, slot: 1, span: 3, title: 'Free study', free: true },
          ]}
        />
      </Card.Body>
    </Card>
  );
}

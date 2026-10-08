import { Card, Switch } from 'officehut/react';

const SETTINGS = [
  {
    label: 'Claim approved',
    hint: 'When finance releases the payment.',
    on: true,
  },
  {
    label: 'Leave request answered',
    hint: 'Approved, declined or sent back.',
    on: true,
  },
  {
    label: 'Room booking reminders',
    hint: '15 minutes before the meeting.',
    on: false,
  },
  { label: 'Weekly timesheet digest', hint: 'Fridays at 16:00.', on: false },
];

export default function SettingsList() {
  return (
    <Card style={{ maxWidth: 440 }}>
      <Card.Header>
        <Card.Title>Email me when…</Card.Title>
      </Card.Header>
      <Card.Body className='stack gap-4'>
        {SETTINGS.map((s) => (
          <Switch key={s.label} reverse defaultChecked={s.on} hint={s.hint}>
            {s.label}
          </Switch>
        ))}
      </Card.Body>
    </Card>
  );
}

import { useState } from 'react';
import { Card, Checklist, Progress, type ChecklistItem } from 'officehut/react';

const STEPS: ChecklistItem[] = [
  { id: 'contract', label: 'Sign the employment contract', meta: 'HR' },
  { id: 'bank', label: 'Send bank details for payroll', meta: 'HR' },
  { id: 'laptop', label: 'Collect laptop and badge', meta: 'IT · 2C' },
  { id: 'mfa', label: 'Set up two-factor sign-in', meta: 'IT' },
  { id: 'handbook', label: 'Read the employee handbook', meta: 'you' },
  { id: 'buddy', label: 'Coffee with your buddy, Karim', meta: 'Thu' },
];

// Controlled: the card reads the ticked ids to show progress.
export default function Onboarding() {
  const [done, setDone] = useState<string[]>(['contract', 'laptop']);
  return (
    <Card style={{ maxWidth: 560 }}>
      <Card.Header>
        <Card.Title>Your first week</Card.Title>
      </Card.Header>
      <Card.Body className='stack gap-4'>
        <Progress
          value={(done.length / STEPS.length) * 100}
          label='Onboarding'
          showValue={`${done.length} of ${STEPS.length}`}
          color={done.length === STEPS.length ? 'success' : 'primary'}
          ruled
        />
        <Checklist
          aria-label='Onboarding steps'
          flush
          items={STEPS}
          value={done}
          onChange={setDone}
        />
      </Card.Body>
    </Card>
  );
}

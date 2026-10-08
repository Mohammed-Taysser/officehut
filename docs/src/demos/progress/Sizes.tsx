import { Progress } from 'officehut/react';

export default function Sizes() {
  return (
    <div className='stack' style={{ maxWidth: 420 }}>
      <Progress size='sm' value={35} label='Onboarding checklist' showValue />
      <Progress
        value={62}
        label='Timesheets submitted'
        showValue
        color='success'
      />
      <Progress
        size='lg'
        value={78}
        aria-label='Office move — boxes packed'
        showValue
        color='aurora'
      />
    </div>
  );
}

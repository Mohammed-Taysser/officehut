import { Tracking } from 'officehut/react';
import { uptime } from './data';

const days = uptime(30, {
  1: ['danger', 'outage 42 min'],
  9: ['warning', 'slow responses 14 min'],
  23: ['warning', 'degraded 6 min'],
});

export default function Basic() {
  return (
    <div style={{ maxWidth: 520 }}>
      <div className='d-flex justify-content-between align-items-baseline mb-2'>
        <span className='fw-medium'>payroll-api</span>
        <span className='font-mono fs-sm tabular-nums'>99.89% uptime</span>
      </div>
      <Tracking
        items={days}
        aria-label='payroll-api uptime, last 30 days'
        startLabel='30 days ago'
        endLabel='Today'
      />
    </div>
  );
}

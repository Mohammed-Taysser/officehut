import { Timeline } from 'officehut/react';

export default function Plain() {
  return (
    <Timeline
      plain
      aria-label='Onboarding: Youssef Tarek'
      style={{ maxWidth: 420 }}
    >
      <Timeline.Item color='success' title='Contract signed' />
      <Timeline.Item color='success' title='Laptop and badge issued' />
      <Timeline.Item color='primary' title='Security training'>
        Booked for Sunday 19 Oct, 10:00, room 4B.
      </Timeline.Item>
      <Timeline.Item hollow title='Probation review' />
    </Timeline>
  );
}

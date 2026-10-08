import { Tabs } from 'officehut/react';

const RANGES = [
  { value: 'day', label: 'Day', hours: '7.5' },
  { value: 'week', label: 'Week', hours: '38.5' },
  { value: 'month', label: 'Month', hours: '162' },
];

export default function Segmented() {
  return (
    <Tabs defaultValue='week'>
      <Tabs.List variant='segmented' aria-label='Range'>
        {RANGES.map((r) => (
          <Tabs.Tab key={r.value} value={r.value}>
            {r.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {RANGES.map((r) => (
        <Tabs.Panel key={r.value} value={r.value}>
          <p className='fs-2xl fw-bold tabular-nums'>{r.hours} hours</p>
          <p className='text-subtle fs-sm'>Logged by the Facilities team</p>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}

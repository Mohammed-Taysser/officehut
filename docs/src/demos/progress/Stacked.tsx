import { Progress, Status } from 'officehut/react';

const segments = [
  { value: 61, color: 'success', label: 'Paid' },
  { value: 24, color: 'warning', label: 'Pending' },
  { value: 9, color: 'danger', label: 'Overdue' },
] as const;

export default function Stacked() {
  return (
    <div style={{ maxWidth: 460 }}>
      <Progress
        size='lg'
        label='Invoices issued in Q3 (by value)'
        segments={[...segments]}
      />
      <div className='cluster mt-2'>
        {segments.map((s) => (
          <Status key={s.label} color={s.color} size='sm'>
            {s.label} <span className='font-mono tabular-nums'>{s.value}%</span>
          </Status>
        ))}
        <Status size='sm'>
          Draft <span className='font-mono tabular-nums'>6%</span>
        </Status>
      </div>
    </div>
  );
}

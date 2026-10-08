import { useState } from 'react';
import { Checkbox } from 'officehut/react';

const TIMESHEETS = [
  { id: 'ts-41', name: 'Omar Hassan', hours: '38.5' },
  { id: 'ts-42', name: 'Laila Samir', hours: '40.0' },
  { id: 'ts-43', name: 'Karim Fawzy', hours: '44.5' },
];

export default function SelectAll() {
  const [picked, setPicked] = useState<string[]>(['ts-42']);
  const all = picked.length === TIMESHEETS.length;
  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <div className='stack gap-2' style={{ maxWidth: 360 }}>
      <Checkbox
        id='week-41'
        checked={all}
        indeterminate={picked.length > 0 && !all}
        onChange={() => setPicked(all ? [] : TIMESHEETS.map((t) => t.id))}
      >
        <strong>Approve week 41</strong>{' '}
        <span className='text-subtle'>({picked.length} of 3)</span>
      </Checkbox>
      <div className='stack gap-2 ps-5'>
        {TIMESHEETS.map((t) => (
          <Checkbox
            key={t.id}
            data-timesheet
            checked={picked.includes(t.id)}
            onChange={() => toggle(t.id)}
          >
            {t.name} <span className='font-mono text-subtle'>{t.hours} h</span>
          </Checkbox>
        ))}
      </div>
    </div>
  );
}

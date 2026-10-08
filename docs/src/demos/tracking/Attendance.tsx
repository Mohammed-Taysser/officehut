import { Tracking, type TrackingItem } from 'officehut/react';

// One block per working day in September, like a punched time card.
const marks = 'PPPPLPPPPPPRPPPPPPPPAPPPEE';
const legend: Record<string, [TrackingItem['status'], string]> = {
  P: ['success', 'in on time'],
  L: ['warning', 'late'],
  R: ['info', 'remote'],
  A: ['danger', 'absent'],
  E: ['empty', 'not recorded'],
};

const items = [...marks].map((m, i) => {
  const [status, text] = legend[m]!;
  return { status, label: `Working day ${i + 1} — ${text}` };
});

export default function Attendance() {
  return (
    <div className='stack gap-3' style={{ maxWidth: 520 }}>
      <div>
        <p className='fs-sm mb-1'>Youssef Tarek · September</p>
        <Tracking
          size='sm'
          items={items}
          aria-label='Youssef Tarek attendance, September'
        />
      </div>
      <div>
        <p className='fs-sm mb-1'>Same data, large</p>
        <Tracking
          size='lg'
          items={items}
          aria-label='Youssef Tarek attendance, September, large'
        />
      </div>
    </div>
  );
}

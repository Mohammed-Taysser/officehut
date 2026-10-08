import { useState } from 'react';
import { Chip, ChipList } from 'officehut/react';

const offices = ['Cairo', 'Alexandria', 'Mansoura', 'Remote'];

export default function Toggle() {
  const [on, setOn] = useState<string[]>(['Cairo']);
  const flip = (o: string) =>
    setOn((all) =>
      all.includes(o) ? all.filter((x) => x !== o) : [...all, o],
    );
  return (
    <div>
      <p className='fs-sm text-subtle mb-2' id='office-filter'>
        Show staff in
      </p>
      <ChipList role='group' aria-labelledby='office-filter'>
        {offices.map((o) => (
          <Chip
            key={o}
            as='button'
            color='primary'
            aria-pressed={on.includes(o)}
            onClick={() => flip(o)}
          >
            {o}
          </Chip>
        ))}
      </ChipList>
    </div>
  );
}

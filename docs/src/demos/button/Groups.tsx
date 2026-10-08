import { useState } from 'react';
import { Button, ButtonList } from 'officehut/react';

const RANGES = ['Day', 'Week', 'Month', 'Quarter'] as const;

export default function Groups() {
  const [range, setRange] = useState<(typeof RANGES)[number]>('Week');
  return (
    <ButtonList attached aria-label='Report range'>
      {RANGES.map((r) => (
        <Button key={r} aria-pressed={range === r} onClick={() => setRange(r)}>
          {r}
        </Button>
      ))}
    </ButtonList>
  );
}

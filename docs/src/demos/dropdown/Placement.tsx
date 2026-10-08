import { Button, Dropdown } from 'officehut/react';

const PLACEMENTS = [
  'bottom-start',
  'bottom-end',
  'top-start',
  'right-start',
] as const;

export default function Placement() {
  return (
    <div className='cluster gap-3'>
      {PLACEMENTS.map((p) => (
        <Dropdown
          key={p}
          placement={p}
          trigger={<Button className='dropdown-toggle'>{p}</Button>}
        >
          <Dropdown.Item>Week 40</Dropdown.Item>
          <Dropdown.Item>Week 41</Dropdown.Item>
          <Dropdown.Item active>Week 42</Dropdown.Item>
        </Dropdown>
      ))}
    </div>
  );
}

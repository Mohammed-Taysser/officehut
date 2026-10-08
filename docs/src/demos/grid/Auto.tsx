import type { CSSProperties } from 'react';
import { Avatar } from 'officehut/react';

const team = [
  'Mona Adel',
  'Karim Fawzy',
  'Laila Samir',
  'Omar Hany',
  'Salma Nour',
  'Youssef Ali',
  'Nadia Kamel',
];

export default function Auto() {
  return (
    <div className='grid-auto' style={{ '--min': '11rem' } as CSSProperties}>
      {team.map((name) => (
        <div key={name} className='hstack border rounded p-2 bg-surface'>
          <Avatar name={name} size='sm' circle />
          <span className='text-truncate'>{name}</span>
        </div>
      ))}
    </div>
  );
}

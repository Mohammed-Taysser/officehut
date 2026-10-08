import { Avatar } from 'officehut/react';

const people = [
  { name: 'Mona Adel', presence: 'online', note: 'In the office' },
  { name: 'Karim Fawzy', presence: 'busy', note: 'In a meeting until 11:30' },
  { name: 'Salma Nour', presence: 'away', note: 'Back at 14:00' },
  { name: 'Youssef Ali', presence: 'offline', note: 'On leave this week' },
] as const;

export default function Presence() {
  return (
    <ul className='list-unstyled stack gap-3'>
      {people.map((p) => (
        <li key={p.name} className='hstack gap-3'>
          <Avatar name={p.name} presence={p.presence} circle aria-hidden />
          <div>
            <p className='fw-medium'>{p.name}</p>
            <p className='text-subtle fs-sm'>{p.note}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

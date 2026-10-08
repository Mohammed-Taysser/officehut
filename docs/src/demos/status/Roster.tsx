import { Avatar, Card, Status } from 'officehut/react';

const people = [
  {
    name: 'Mona Adel',
    role: 'Finance lead',
    status: 'success',
    text: 'Online',
  },
  {
    name: 'Karim Fawzy',
    role: 'Facilities',
    status: 'danger',
    text: 'In a meeting until 15:00',
    pulse: true,
  },
  {
    name: 'Laila Samir',
    role: 'People ops',
    status: 'warning',
    text: 'Away · back at 13:30',
  },
  {
    name: 'Omar Hassan',
    role: 'IT support',
    status: 'primary',
    text: 'On call this week',
    pulse: true,
  },
  {
    name: 'Salma Nour',
    role: 'Accounts payable',
    status: undefined,
    text: 'On leave',
  },
] as const;

export default function Roster() {
  return (
    <Card
      style={{ maxWidth: 440 }}
      title='Who’s in today'
      subtitle='Cairo office · 3rd floor'
    >
      <ul
        className='stack gap-3 mt-2'
        style={{ listStyle: 'none', padding: 0, margin: 0 }}
      >
        {people.map((p) => (
          <li key={p.name} className='hstack gap-3'>
            <Avatar name={p.name} circle size='sm' />
            <div className='flex-1 min-w-0'>
              <p className='fw-medium'>{p.name}</p>
              <p className='fs-xs text-subtle'>{p.role}</p>
            </div>
            <Status color={p.status} pulse={'pulse' in p} size='sm'>
              {p.text}
            </Status>
          </li>
        ))}
      </ul>
    </Card>
  );
}

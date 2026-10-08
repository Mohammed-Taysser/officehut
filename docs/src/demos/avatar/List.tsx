import { Avatar, AvatarList } from 'officehut/react';

const team = [
  'Mona Adel',
  'Karim Fawzy',
  'Laila Samir',
  'Omar Hany',
  'Salma Nour',
  'Youssef Ali',
  'Nadia Kamel',
];

export default function List() {
  return (
    <div className='stack gap-4'>
      <AvatarList>
        {team.slice(0, 4).map((n) => (
          <Avatar key={n} name={n} size='sm' />
        ))}
      </AvatarList>
      <AvatarList
        stacked
        max={4}
        size='sm'
        aria-label='7 people in the Facilities team'
      >
        {team.map((n) => (
          <Avatar key={n} name={n} size='sm' circle />
        ))}
      </AvatarList>
    </div>
  );
}

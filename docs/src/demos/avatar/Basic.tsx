import { IconBuilding, IconUser } from '@tabler/icons-react';
import { Avatar } from 'officehut/react';

const PHOTO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Crect width='40' height='40' fill='%23d3ccbc'/%3E%3Ccircle cx='20' cy='16' r='7' fill='%238b8f95'/%3E%3Cpath d='M6 40c2-9 8-13 14-13s12 4 14 13z' fill='%238b8f95'/%3E%3C/svg%3E";

export default function Basic() {
  return (
    <div className='hstack gap-3'>
      <Avatar name='Mona Adel' />
      <Avatar name='Karim Fawzy' circle />
      <Avatar name='Laila Samir' src={PHOTO} />
      <Avatar
        name='Nile Office Supplies'
        icon={<IconBuilding />}
        color='secondary'
      />
      <Avatar icon={<IconUser />} aria-label='Unassigned' />
      <Avatar name='Broken Photo' src='/missing.jpg' circle />
    </div>
  );
}

import { Breadcrumb } from 'officehut/react';

const items = [
  { label: 'Facilities', href: '#facilities' },
  { label: 'Building A', href: '#building-a' },
  { label: 'Floor 3' },
];

export default function Dividers() {
  return (
    <div className='stack gap-3'>
      <Breadcrumb items={items} />
      <Breadcrumb items={items} divider='arrow' />
      <Breadcrumb items={items} divider='dot' />
      <Breadcrumb items={items} divider='→' />
    </div>
  );
}

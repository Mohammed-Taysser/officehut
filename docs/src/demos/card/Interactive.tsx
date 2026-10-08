import { Avatar, Card } from 'officehut/react';

const people = [
  { name: 'Mona Adel', role: 'Finance lead' },
  { name: 'Karim Fawzy', role: 'Facilities' },
  { name: 'Laila Samir', role: 'People ops' },
];

export default function Interactive() {
  return (
    <div className='grid cols-1 cols-sm-3'>
      {people.map((p) => (
        <Card key={p.name} interactive>
          <Card.Body className='d-flex align-items-center gap-3'>
            <Avatar name={p.name} circle />
            <div className='min-w-0'>
              <a
                href='#directory'
                className='stretched-link text-reset text-decoration-none fw-medium'
              >
                {p.name}
              </a>
              <p className='text-subtle fs-sm'>{p.role}</p>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

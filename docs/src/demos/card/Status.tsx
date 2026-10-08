import { Card } from 'officehut/react';

const tickets = [
  {
    id: 'OPS-311',
    title: 'Printer on 3rd floor jams',
    status: 'danger',
    where: 'top',
  },
  {
    id: 'OPS-309',
    title: 'Renew parking permits',
    status: 'warning',
    where: 'start',
  },
  {
    id: 'OPS-302',
    title: 'New hire laptop ready',
    status: 'success',
    where: 'bottom',
  },
] as const;

export default function Status() {
  return (
    <div className='grid cols-1 cols-md-3'>
      {tickets.map((t) => (
        <Card key={t.id} status={t.status} statusPosition={t.where}>
          <Card.Body>
            <span className='eyebrow font-mono'>{t.id}</span>
            <p className='mt-1 fw-medium'>{t.title}</p>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

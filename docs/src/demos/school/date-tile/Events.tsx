import { Badge, Card, DateTile } from 'officehut/react';

const EVENTS = [
  {
    date: '2026-10-14T10:30',
    title: 'Fire drill',
    where: '10:30 · meet at gate B',
    band: 'red',
    tag: 'Everyone',
  },
  {
    date: '2026-10-20T12:00',
    title: 'Payroll cut-off',
    where: 'Overtime sheets by noon',
    band: 'dark',
    tag: 'Managers',
  },
  {
    date: '2026-10-23T15:00',
    title: 'Quarterly town hall',
    where: '15:00 · canteen and online',
    band: 'blue',
    tag: 'Everyone',
  },
  {
    date: '2026-10-29T09:00',
    title: 'Health insurance renewal',
    where: 'Forms to HR',
    band: 'green',
    tag: 'Optional',
  },
] as const;

// "Coming up" on the intranet home page.
export default function Events() {
  return (
    <Card style={{ maxWidth: 520 }}>
      <Card.Header>
        <Card.Title>Coming up</Card.Title>
      </Card.Header>
      <ul className='list-unstyled'>
        {EVENTS.map((e) => (
          <li
            key={e.title}
            className='d-flex align-items-center gap-4 px-4 py-3 border-bottom'
          >
            <DateTile date={e.date} locale='en-GB' size='sm' band={e.band} />
            <div className='flex-1 min-w-0'>
              <p className='fw-medium'>{e.title}</p>
              <p className='text-subtle fs-sm'>{e.where}</p>
            </div>
            <Badge>{e.tag}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}

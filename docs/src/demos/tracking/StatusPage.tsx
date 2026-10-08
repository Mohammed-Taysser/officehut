import { Card, Status, Tracking } from 'officehut/react';
import { uptime } from './data';

const services = [
  {
    name: 'Payroll API',
    pct: '99.89',
    items: uptime(45, {
      1: ['danger', 'outage 42 min'],
      9: ['warning', 'slow 14 min'],
    }),
  },
  {
    name: 'VPN gateway',
    pct: '99.97',
    items: uptime(45, { 30: ['warning', 'certificate renewal 9 min'] }),
  },
  {
    name: 'Print queue, 3rd floor',
    pct: '97.40',
    items: uptime(45, {
      0: ['danger', 'tray 2 jams'],
      1: ['danger', 'tray 2 jams'],
      15: ['warning', 'toner low'],
    }),
  },
  { name: 'Expense portal', pct: '100.00', items: uptime(45) },
];

export default function StatusPage() {
  return (
    <Card style={{ maxWidth: 640 }}>
      <Card.Header>
        <Card.Title>Internal services</Card.Title>
        <Card.Actions>
          <Status color='warning' pulse size='sm'>
            1 incident open
          </Status>
        </Card.Actions>
      </Card.Header>
      <Card.Body className='stack gap-4'>
        {services.map((s) => (
          <div key={s.name}>
            <div className='d-flex justify-content-between align-items-baseline mb-1'>
              <span className='fw-medium fs-sm'>{s.name}</span>
              <span className='font-mono fs-xs tabular-nums text-muted'>
                {s.pct}%
              </span>
            </div>
            <Tracking
              size='sm'
              items={s.items}
              aria-label={`${s.name}, last 45 days`}
            />
          </div>
        ))}
      </Card.Body>
      <Card.Footer>
        <span className='font-mono fs-xs text-subtle'>45 days ago</span>
        <span className='font-mono fs-xs text-subtle ms-auto'>
          Today, 7 Oct
        </span>
      </Card.Footer>
    </Card>
  );
}

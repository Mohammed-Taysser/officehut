import { Accordion, Badge, Card } from 'officehut/react';

const months = [
  { month: 'October', total: '12,480.00', claims: 9, open: true },
  { month: 'September', total: '9,310.50', claims: 14 },
  { month: 'August', total: '7,045.00', claims: 6 },
];

export default function Flush() {
  return (
    <Card style={{ maxWidth: 520 }}>
      <Card.Header>
        <Card.Title>Expense claims</Card.Title>
      </Card.Header>
      <Accordion flush>
        {months.map((m) => (
          <Accordion.Item
            key={m.month}
            defaultOpen={m.open}
            title={
              <>
                {m.month}
                <Badge pill>{m.claims}</Badge>
              </>
            }
          >
            <p className='tabular-nums'>Total: {m.total} EGP</p>
          </Accordion.Item>
        ))}
      </Accordion>
    </Card>
  );
}

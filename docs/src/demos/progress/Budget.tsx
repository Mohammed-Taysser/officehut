import { Badge, Card, Progress } from 'officehut/react';

const departments = [
  { name: 'Facilities', spent: 412_000, budget: 480_000 },
  { name: 'IT & licences', spent: 655_500, budget: 620_000 },
  { name: 'Training', spent: 96_300, budget: 210_000 },
  { name: 'Travel', spent: 133_750, budget: 175_000 },
];

const egp = (n: number) => n.toLocaleString('en-US');

export default function Budget() {
  return (
    <Card style={{ maxWidth: 520 }}>
      <Card.Header>
        <Card.Title>Department budgets</Card.Title>
        <Card.Actions>
          <Badge variant='outline'>FY26 · to 30 Sep</Badge>
        </Card.Actions>
      </Card.Header>
      <Card.Body className='stack'>
        {departments.map((d) => {
          const over = d.spent > d.budget;
          const pct = d.spent / d.budget;
          return (
            <Progress
              key={d.name}
              ruled
              label={d.name}
              value={d.spent}
              max={d.budget}
              color={over ? 'danger' : pct > 0.8 ? 'warning' : 'primary'}
              showValue={`${egp(d.spent)} / ${egp(d.budget)}`}
              valueText={`EGP ${egp(d.spent)} of ${egp(d.budget)}${over ? ', over budget' : ''}`}
            />
          );
        })}
      </Card.Body>
      <Card.Footer>
        <span className='fs-xs text-subtle'>
          Figures in EGP. IT is over budget after the Microsoft 365 renewal.
        </span>
      </Card.Footer>
    </Card>
  );
}

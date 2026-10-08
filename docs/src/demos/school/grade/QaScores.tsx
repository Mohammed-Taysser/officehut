import { Card, Grade } from 'officehut/react';

const CALLS = [
  { agent: 'Salma Nour', calls: 38, score: '46/50', pass: true },
  { agent: 'Youssef Ali', calls: 41, score: '39/50', pass: true },
  { agent: 'Omar Hany', calls: 29, score: '31/50', pass: false },
];

// Call-centre QA: each agent's sampled calls scored out of 50. 40 is a pass.
export default function QaScores() {
  return (
    <div className='grid cols-1 cols-md-3 gap-4'>
      {CALLS.map((c) => (
        <Card key={c.agent} size='sm'>
          <Card.Body className='d-flex align-items-center gap-3'>
            <div className='flex-1'>
              <p className='fw-medium'>{c.agent}</p>
              <p className='text-subtle fs-sm'>{c.calls} calls sampled</p>
              <p className='fs-xs'>
                {c.pass ? 'Pass' : 'Below 40 · coaching booked'}
              </p>
            </div>
            <Grade value={c.score} pen={c.pass ? 'green' : 'red'} />
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

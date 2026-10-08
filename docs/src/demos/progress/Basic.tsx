import { Progress } from 'officehut/react';

export default function Basic() {
  return (
    <div className='stack' style={{ maxWidth: 420 }}>
      <Progress
        label='Q3 marketing budget'
        value={84200}
        max={120000}
        showValue='EGP 84,200 / 120,000'
        valueText='EGP 84,200 of 120,000 spent'
      />
      <Progress
        label='Annual leave used'
        value={14}
        max={21}
        showValue='14 of 21 days'
        color='info'
      />
      <Progress
        label='Disk /var on fs-cairo-02'
        value={91}
        showValue
        color='danger'
      />
    </div>
  );
}

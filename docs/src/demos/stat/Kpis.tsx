import { Sparkline, Stat } from 'officehut/react';

export default function Kpis() {
  return (
    <div className='grid cols-1 cols-md-3'>
      <Stat
        label='Open invoices'
        value='38'
        delta='+4'
        trend='up'
        sentiment='neutral'
        meta='vs. last week'
        chart={
          <Sparkline
            values={[29, 31, 30, 33, 34, 32, 38]}
            label='Open invoices, last 7 weeks'
          />
        }
      />
      <Stat
        label='Overdue'
        value='EGP 61,240'
        delta='+18%'
        trend='up'
        sentiment='bad'
        meta='vs. September'
        note='chase Giza Catering'
        color='danger'
        chart={
          <Sparkline
            values={[22, 25, 31, 28, 40, 52, 61]}
            area
            label='Overdue amount, rising'
          />
        }
      />
      <Stat
        label='Paid this month'
        value='318,900'
        unit='EGP'
        delta='+12%'
        trend='up'
        meta='vs. September'
        color='success'
        chart={
          <Sparkline
            values={[180, 210, 196, 240, 262, 285, 319]}
            label='Paid per month, rising'
          />
        }
      />
    </div>
  );
}

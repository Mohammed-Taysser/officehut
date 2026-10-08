import { Sparkline, Stat } from 'officehut/react';

export default function Single() {
  return (
    <Stat
      style={{ maxWidth: 300 }}
      label='SLA uptime · payroll-api'
      value='99.94'
      unit='%'
      delta='−0.03'
      trend='down'
      meta='30 days'
      note='blip on 6 Oct, 42 min'
      chart={
        <Sparkline
          values={[99.99, 99.98, 99.99, 99.97, 99.91, 99.95, 99.94]}
          baseline
          label='Uptime, last 7 weeks'
        />
      }
    />
  );
}

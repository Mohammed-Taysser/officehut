import { Stat, StatGroup } from 'officehut/react';

export default function Group() {
  return (
    <StatGroup>
      <Stat
        label='Headcount'
        value='141'
        delta='+3'
        trend='up'
        meta='since July'
      />
      <Stat
        label='Open roles'
        value='19'
        delta='−2'
        trend='down'
        sentiment='good'
        meta='since July'
      />
      <Stat
        label='Avg. time to hire'
        value='34'
        unit='days'
        delta='+5'
        trend='up'
        sentiment='bad'
        meta='target 28'
      />
      <Stat
        label='Leave balance'
        value='1,204'
        unit='days'
        delta='±0'
        trend='flat'
        meta='company-wide'
      />
    </StatGroup>
  );
}

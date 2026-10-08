import { Progress } from 'officehut/react';

export default function Ruled() {
  return (
    <div className='stack' style={{ maxWidth: 460 }}>
      <Progress
        ruled
        scale
        value={40}
        label='Fire-safety training, 2nd floor'
        showValue='16 of 40 staff'
      />
      <Progress
        ruled
        value={72}
        label='Sprint 14 — story points done'
        showValue='36 / 50'
        color='success'
      />
    </div>
  );
}

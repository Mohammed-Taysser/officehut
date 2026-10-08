import { Card } from 'officehut/react';

export default function Shorthand() {
  return (
    <Card
      style={{ maxWidth: 380 }}
      title='Server room temperature'
      subtitle='Sensor B-2 · updated 2 minutes ago'
      footer={<span className='text-subtle fs-sm'>Threshold 27 °C</span>}
    >
      <p className='fs-2xl fw-bold tabular-nums'>22.4 °C</p>
    </Card>
  );
}

import { Chalkboard } from 'officehut/react';

// Guest Wi-Fi on the reception screen. No hand font: people copy this.
export default function Code() {
  return (
    <Chalkboard style={{ maxWidth: 460 }}>
      <h3>Guest Wi-Fi</h3>
      <p className='mt-2'>
        Network: <code>OfficeHut-Guest</code>
      </p>
      <p>
        Password: <code>cairo-2026-oct</code>
      </p>
      <p className='mt-2 chalk-dim fs-sm'>
        Changes on the 1st of every month. Ask reception if it stops working.
      </p>
    </Chalkboard>
  );
}

import { Handwriting, MarginNote, Notebook } from 'officehut/react';

export default function Lined() {
  return (
    <Notebook holes style={{ maxWidth: 620 }}>
      <h2>
        <MarginNote>1.</MarginNote>
        Onboarding: first week
      </h2>
      <p>
        Laptop, badge and parking permit are ready at reception on Sunday
        morning.
      </p>
      <ul>
        <li>Sunday: IT setup with Omar, 10:00</li>
        <li>Monday: payroll forms with Laila</li>
        <li>Tuesday: shadow the facilities team</li>
      </ul>
      <p>
        Questions go to your buddy, Karim.{' '}
        <Handwriting className='text-primary'>
          He knows where everything is.
        </Handwriting>
      </p>
    </Notebook>
  );
}

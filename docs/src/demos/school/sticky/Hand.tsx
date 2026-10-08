import { Sticky } from 'officehut/react';

export default function Hand() {
  return (
    <div
      className='d-flex flex-wrap align-items-start gap-6'
      style={{ paddingTop: '0.75rem' }}
    >
      <Sticky style={{ width: '13rem' }}>
        Typed. Good for anything people need to copy: <code>PO-7731</code>
      </Sticky>
      <Sticky color='pink' hand style={{ width: '13rem' }}>
        Handwritten — call Salma back about the visa letter
      </Sticky>
      <Sticky color='blue' hand taped title='Taped' style={{ width: '13rem' }}>
        Stuck down with clear tape across the top.
      </Sticky>
      <Sticky color='green' straight style={{ width: '13rem' }}>
        Straight: no tilt, for tidy grids and long text.
      </Sticky>
    </div>
  );
}

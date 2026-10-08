import { Sparkline } from 'officehut/react';

const tickets = [14, 18, 12, 21, 19, 25, 23, 17, 15, 11];

export default function Sparklines() {
  return (
    <div className='cluster gap-6'>
      <figure className='m-0'>
        <Sparkline
          values={tickets}
          label='Tickets opened per day, last 10 days'
        />
        <figcaption className='fs-xs text-subtle mt-1'>
          Line + latest dot
        </figcaption>
      </figure>
      <figure className='m-0'>
        <Sparkline
          values={tickets}
          area
          color='primary'
          label='Tickets with area'
        />
        <figcaption className='fs-xs text-subtle mt-1'>area</figcaption>
      </figure>
      <figure className='m-0'>
        <Sparkline
          values={tickets}
          baseline
          dot={false}
          color='aurora'
          label='Tickets against the first day'
        />
        <figcaption className='fs-xs text-subtle mt-1'>
          baseline, no dot
        </figcaption>
      </figure>
      <figure className='m-0'>
        <Sparkline
          values={tickets}
          width={160}
          height={40}
          color='success'
          label='Larger sparkline'
        />
        <figcaption className='fs-xs text-subtle mt-1'>160 × 40</figcaption>
      </figure>
    </div>
  );
}

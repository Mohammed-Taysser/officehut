import { Chalkboard } from 'officehut/react';

// Standup notes in coloured chalk. Plain font for the list, hand for headings.
export default function Standup() {
  return (
    <Chalkboard style={{ maxWidth: 620 }}>
      <h3>
        Standup · <span className='chalk-underline'>Thu 8 Oct</span>
      </h3>
      <ul className='mt-2 stack gap-1'>
        <li>
          <span className='chalk-green'>Done:</span> supplier list moved to the
          new system
        </li>
        <li>
          <span className='chalk-blue'>Today:</span> chase Giza Catering for the
          September invoice
        </li>
        <li>
          <span className='chalk-pink'>Blocked:</span> VAT portal is down again
          — IT ticket OPS-311
        </li>
      </ul>
      <p className='mt-3 chalk-dim fs-sm'>Next standup: Sunday, 09:15</p>
    </Chalkboard>
  );
}

import { Chalkboard } from 'officehut/react';

// Today's agenda on the screen outside the boardroom.
export default function Agenda() {
  return (
    <Chalkboard hand style={{ maxWidth: 520 }}>
      <h3>Thursday · board meeting</h3>
      <ol className='mt-2'>
        <li>Q3 results — Karim</li>
        <li>New office lease — Legal</li>
        <li>Hiring plan for 2027 — HR</li>
        <li>
          Any other business <span className='chalk-dim'>(5 min, please)</span>
        </li>
      </ol>
      <p className='mt-3 chalk-yellow'>Lunch at 13:00 in room 5A</p>
    </Chalkboard>
  );
}

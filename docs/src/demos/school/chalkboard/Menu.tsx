import { Chalkboard } from 'officehut/react';

const DISHES = [
  { name: 'Koshari', note: 'with crispy onions', price: 65 },
  { name: 'Grilled chicken & rice', note: 'salad on the side', price: 120 },
  { name: 'Lentil soup', note: 'vegan', price: 45 },
  { name: 'Om Ali', note: 'while it lasts', price: 50 },
];

// The canteen menu on the intranet, written up the way the cook writes it.
export default function Menu() {
  return (
    <Chalkboard
      hand
      as='section'
      aria-labelledby='menu-title'
      style={{ maxWidth: 440 }}
    >
      <h3 id='menu-title' className='text-center'>
        Today in the canteen
      </h3>
      <ul className='list-unstyled mt-3 stack gap-2'>
        {DISHES.map((d) => (
          <li key={d.name} className='d-flex align-items-baseline gap-3'>
            <span className='flex-1'>
              {d.name} <span className='chalk-dim'>— {d.note}</span>
            </span>
            <span className='chalk-yellow tabular-nums'>{d.price} EGP</span>
          </li>
        ))}
      </ul>
      <p className='mt-3 text-center'>
        <button type='button' className='btn btn-sm btn-chalk'>
          Pre-order for 12:30
        </button>
      </p>
    </Chalkboard>
  );
}

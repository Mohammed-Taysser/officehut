import { Button, EmptyState } from 'officehut/react';

const Magnifier = () => (
  <svg
    viewBox='0 0 64 48'
    width='64'
    height='48'
    fill='none'
    stroke='currentColor'
    strokeWidth={1.5}
    strokeLinecap='round'
    aria-hidden
  >
    <rect x='8' y='6' width='34' height='36' rx='2' />
    <path d='M14 14h22M14 20h16M14 26h19' strokeOpacity={0.45} />
    <circle cx='42' cy='28' r='9' fill='var(--oh-surface)' />
    <path d='m48.5 34.5 7 7' />
  </svg>
);

export default function NoResults() {
  return (
    <EmptyState
      icon={<Magnifier />}
      title='No suppliers match “Nile Freigth”'
      actions={<Button size='sm'>Clear search</Button>}
    >
      Check the spelling, or search by tax registration number instead.
    </EmptyState>
  );
}

import { useState } from 'react';
import { Button, Chip, ChipList } from 'officehut/react';

const initial = [
  { key: 'Status', value: 'Overdue', color: 'danger' },
  { key: 'Client', value: 'Giza Catering', color: undefined },
  { key: 'Issued', value: 'Jul – Sep 2026', color: undefined },
  { key: 'Amount', value: '> EGP 5,000', color: undefined },
] as const;

export default function Filters() {
  const [filters, setFilters] =
    useState<readonly (typeof initial)[number][]>(initial);
  return (
    <div className='cluster'>
      <ChipList aria-label='Active filters'>
        {filters.map((f) => (
          <Chip
            key={f.key}
            label={f.key}
            color={f.color}
            onRemove={() => setFilters((all) => all.filter((x) => x !== f))}
            removeLabel={`Remove filter ${f.key}: ${f.value}`}
          >
            {f.value}
          </Chip>
        ))}
      </ChipList>
      {filters.length < initial.length ? (
        <Button size='sm' variant='link' onClick={() => setFilters(initial)}>
          Reset filters
        </Button>
      ) : (
        <span className='fs-xs text-subtle'>{filters.length} filters</span>
      )}
    </div>
  );
}

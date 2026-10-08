import { useState } from 'react';
import { Button, Card, Chip, ChipList, Divider } from 'officehut/react';

export default function Toolbar() {
  const [tags, setTags] = useState(['Overdue', 'Over EGP 10,000', 'Q3']);
  return (
    <Card style={{ maxWidth: 620 }}>
      <Card.Body className='d-flex flex-wrap align-items-center gap-2'>
        <span className='fw-semibold me-2'>Receivables</span>
        <Divider vertical className='mx-1' />
        <ChipList aria-label='Filters'>
          {tags.map((t) => (
            <Chip
              key={t}
              size='sm'
              onRemove={() => setTags((all) => all.filter((x) => x !== t))}
            >
              {t}
            </Chip>
          ))}
        </ChipList>
        <Button size='sm' variant='ghost' className='ms-auto'>
          + Add filter
        </Button>
      </Card.Body>
      <Card.Footer>
        <span className='fs-xs text-subtle'>
          <span className='font-mono'>{tags.length ? 7 : 42}</span> invoices
          match
        </span>
      </Card.Footer>
    </Card>
  );
}

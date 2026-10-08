import { Pagination } from 'officehut/react';

export default function PaginationVariants() {
  return (
    <div className='stack gap-5'>
      <div>
        <span className='eyebrow mb-2'>Textbook (default)</span>
        <Pagination total={12} defaultPage={6} label='Timesheet pages' />
      </div>
      <div>
        <span className='eyebrow mb-2'>Boxed ledger cells</span>
        <Pagination
          total={48}
          defaultPage={21}
          boxed
          size='sm'
          label='Ledger pages'
        />
      </div>
      <div>
        <span className='eyebrow mb-2'>Compact</span>
        <Pagination
          total={12}
          defaultPage={3}
          variant='compact'
          label='Report pages'
        />
      </div>
      <div>
        <span className='eyebrow mb-2'>Compact, boxed</span>
        <Pagination
          total={9}
          defaultPage={2}
          variant='compact'
          boxed
          label='Receipt pages'
          prevLabel='Back'
          nextLabel='Next receipt'
          summary={(page, total) => (
            <>
              receipt <strong>{page}</strong> / {total}
            </>
          )}
        />
      </div>
    </div>
  );
}

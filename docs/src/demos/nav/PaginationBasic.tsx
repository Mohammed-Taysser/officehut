import { useState } from 'react';
import { Pagination } from 'officehut/react';

const PER_PAGE = 20;
const TOTAL = 233;

export default function PaginationBasic() {
  const [page, setPage] = useState(3);
  const pages = Math.ceil(TOTAL / PER_PAGE);
  const from = (page - 1) * PER_PAGE + 1;
  const to = Math.min(page * PER_PAGE, TOTAL);

  return (
    <div className='pagination-bar'>
      <p className='pagination-info m-0'>
        Showing{' '}
        <strong>
          {from}–{to}
        </strong>{' '}
        of <strong>{TOTAL}</strong> open invoices
      </p>
      <Pagination
        total={pages}
        page={page}
        onChange={setPage}
        label='Invoice pages'
      />
    </div>
  );
}

// Plain HTML: the label goes on the outer span, the visible mark is aria-hidden.
export default function Html() {
  return (
    <div className='d-flex flex-wrap align-items-center gap-6'>
      <span
        className='grade grade-pass'
        role='img'
        aria-label='Safety audit: A'
      >
        <span aria-hidden='true'>A</span>
      </span>
      <span className='d-inline-flex align-items-center'>
        <span
          className='grade grade-sm'
          role='img'
          aria-label='Expense report: 8 out of 10'
        >
          <span className='grade-fraction' aria-hidden='true'>
            <span>8</span>
            <span>10</span>
          </span>
        </span>
        <span className='grade-remark'>receipts missing</span>
      </span>
    </div>
  );
}

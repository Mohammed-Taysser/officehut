// Plain markup. Empty markers number themselves with a CSS counter.
export default function StepsHtml() {
  return (
    <ol className='steps steps-sm' aria-label='Expense claim EXP-1177'>
      <li className='step is-done'>
        <span className='step-marker' aria-hidden='true' />
        <span className='step-body'>
          <span className='step-title'>
            <span className='visually-hidden'>Completed: </span>Receipts
          </span>
          <span className='step-meta'>4 attached</span>
        </span>
      </li>
      <li className='step is-current' aria-current='step'>
        <span className='step-marker' aria-hidden='true' />
        <span className='step-body'>
          <span className='step-title'>
            <span className='visually-hidden'>Current: </span>Line manager
          </span>
          <span className='step-meta'>Since Monday</span>
        </span>
      </li>
      <li className='step'>
        <span className='step-marker' aria-hidden='true' />
        <span className='step-body'>
          <span className='step-title'>
            <span className='visually-hidden'>Not started: </span>Reimbursed
          </span>
        </span>
      </li>
    </ol>
  );
}

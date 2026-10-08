export default function Text() {
  return (
    <div className='stack gap-3' style={{ maxWidth: 560 }}>
      <span className='eyebrow'>Policy · updated 2 October</span>
      <p className='lead'>
        Expense claims over 2,000 EGP need a second approver from finance.
      </p>
      <p>
        Submit receipts within <strong>30 days</strong>. Claims for taxis need
        the trip purpose, and{' '}
        <mark>hotel stays need the folio, not the booking confirmation</mark>.
        Questions go to <a href='#text'>finance@</a>. Press <kbd>Ctrl</kbd> +{' '}
        <kbd>Enter</kbd> to submit; the reference looks like{' '}
        <code>EXP-2026-0418</code>.
      </p>
      <blockquote>
        Late claims are paid in the next cycle, not refused.
      </blockquote>
      <p>
        <small>
          Amounts are in <abbr title='Egyptian pound'>EGP</abbr> and include
          VAT.
        </small>
      </p>
      <pre>
        <code>{`EXP-2026-0418  Taxi, client visit     185.00
EXP-2026-0419  Lunch, 3 people        640.00`}</code>
      </pre>
    </div>
  );
}

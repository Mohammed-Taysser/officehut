import { Checklist } from 'officehut/react';

// Month-end close. Uncontrolled: defaultValue holds the ids already ticked.
export default function MonthEnd() {
  return (
    <div style={{ maxWidth: 560 }}>
      <Checklist
        aria-label='September month-end close'
        defaultValue={['bank', 'petty']}
        items={[
          { id: 'bank', label: 'Reconcile the bank accounts', meta: 'Laila' },
          { id: 'petty', label: 'Count petty cash', meta: 'Omar' },
          {
            id: 'accrue',
            label: 'Accrue utilities and rent',
            meta: 'Tue 6 Oct',
          },
          {
            id: 'vat',
            label: 'File the VAT return',
            meta: 'due yesterday',
            late: true,
          },
          {
            id: 'close',
            label: 'Lock the period in the ledger',
            meta: 'after VAT',
            disabled: true,
          },
        ]}
      />
    </div>
  );
}

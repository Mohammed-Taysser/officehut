import { Button, EmptyState } from 'officehut/react';

export default function Basic() {
  return (
    <EmptyState
      title='No invoices waiting for approval'
      note='Your tray is clear — enjoy the coffee.'
      actions={
        <>
          <Button size='sm'>View approved</Button>
          <Button size='sm' color='primary'>
            Upload invoice
          </Button>
        </>
      }
    >
      Supplier invoices sent to ap@company.eg land here once they are matched to
      a purchase order.
    </EmptyState>
  );
}

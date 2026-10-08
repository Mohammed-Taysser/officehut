import { Button, Card, EmptyState } from 'officehut/react';

export default function Compact() {
  return (
    <div className='grid cols-1 cols-md-2'>
      <Card title='Receipts' subtitle='Trip to Alexandria · 12–13 Oct'>
        <EmptyState
          size='sm'
          bordered
          title='No receipts attached'
          actions={
            <Button size='sm' variant='soft' color='primary'>
              Attach receipts
            </Button>
          }
        >
          Finance needs them before the 25th to pay you back this month.
        </EmptyState>
      </Card>
      <Card title='Overdue tasks'>
        <EmptyState
          size='sm'
          color='success'
          title='Nothing overdue'
          note='Nice work, Omar.'
        />
      </Card>
    </div>
  );
}

import { Card, Ribbon } from 'officehut/react';

const invoices = [
  {
    no: 'INV-0418',
    to: 'Nile Freight Co.',
    amount: '18,450.00',
    due: 'Paid 3 Oct',
    tape: 'Paid',
    color: 'success',
  },
  {
    no: 'INV-0421',
    to: 'Delta Print House',
    amount: '6,120.00',
    due: 'Due 20 Oct',
    tape: 'Draft',
    color: undefined,
  },
  {
    no: 'INV-0397',
    to: 'Giza Catering',
    amount: '9,830.50',
    due: '12 days late',
    tape: 'Overdue',
    color: 'danger',
  },
] as const;

export default function Invoices() {
  return (
    <div className='grid cols-1 cols-md-3 gap-5'>
      {invoices.map((i) => (
        <Card key={i.no}>
          <Ribbon color={i.color}>{i.tape}</Ribbon>
          <Card.Body>
            <span className='eyebrow font-mono'>{i.no}</span>
            <p className='fw-medium mt-1'>{i.to}</p>
            <p className='font-mono tabular-nums fs-lg mt-2'>EGP {i.amount}</p>
            <p className='text-subtle fs-xs'>{i.due}</p>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

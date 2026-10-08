import { Badge, Table } from 'officehut/react';

const invoices = [
  {
    no: 'INV-0418',
    client: 'Nile Freight Co.',
    issued: '12 Sep',
    amount: '18,450.00',
    status: ['Paid', 'success'],
  },
  {
    no: 'INV-0421',
    client: 'Delta Print House',
    issued: '19 Sep',
    amount: '6,120.00',
    status: ['Sent', 'info'],
  },
  {
    no: 'INV-0397',
    client: 'Giza Catering',
    issued: '28 Aug',
    amount: '9,830.50',
    status: ['Overdue', 'danger'],
  },
  {
    no: 'INV-0425',
    client: 'Sinai Solar',
    issued: '2 Oct',
    amount: '142,000.00',
    status: ['Draft', undefined],
  },
] as const;

export default function Basic() {
  return (
    <Table responsive>
      <caption>Invoices issued, last 30 days</caption>
      <thead>
        <tr>
          <th scope='col'>Invoice</th>
          <th scope='col'>Client</th>
          <th scope='col'>Issued</th>
          <th scope='col' className='num'>
            Amount (EGP)
          </th>
          <th scope='col'>Status</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((i) => (
          <tr key={i.no}>
            <td className='font-mono'>{i.no}</td>
            <td>{i.client}</td>
            <td>{i.issued}</td>
            <td className='num'>{i.amount}</td>
            <td>
              <Badge color={i.status[1]}>{i.status[0]}</Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

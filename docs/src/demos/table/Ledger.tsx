import { Table } from 'officehut/react';

const entries = [
  ['01 Oct', 'Opening balance', '', '', '5,000.00'],
  ['02 Oct', 'Courier — Aramex, contracts to Giza', '', '185.00', '4,815.00'],
  ['05 Oct', 'Printer paper, 10 reams', '', '1,240.50', '3,574.50'],
  ['06 Oct', 'Top-up from Accounts', '2,000.00', '', '5,574.50'],
  ['07 Oct', 'Team lunch — Q3 close', '', '2,316.00', '3,258.50'],
];

export default function Ledger() {
  return (
    <Table ledger responsive>
      <caption>Petty cash · Cairo office · October 2026</caption>
      <thead>
        <tr>
          <th scope='col'>Date</th>
          <th scope='col'>Particulars</th>
          <th scope='col' className='num'>
            In
          </th>
          <th scope='col' className='num'>
            Out
          </th>
          <th scope='col' className='num'>
            Balance
          </th>
        </tr>
      </thead>
      <tbody>
        {entries.map(([date, what, inn, out, bal]) => (
          <tr key={what}>
            <td className='font-mono fs-sm'>{date}</td>
            <td>{what}</td>
            <td className='num'>{inn}</td>
            <td className='num'>{out}</td>
            <td className='num'>{bal}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td />
          <th scope='row'>Totals carried forward</th>
          <td className='num'>2,000.00</td>
          <td className='num'>3,741.50</td>
          <td className='num'>3,258.50</td>
        </tr>
      </tfoot>
    </Table>
  );
}

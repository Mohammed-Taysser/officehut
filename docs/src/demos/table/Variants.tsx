import { Table } from 'officehut/react';

const tickets = [
  ['OPS-311', 'Printer on 3rd floor jams', 'Omar Hassan', '1h 20m', ''],
  ['OPS-309', 'Renew parking permits', 'Karim Fawzy', '3d 4h', 'warning'],
  ['OPS-306', 'VPN drops every 20 minutes', 'Omar Hassan', '6d 2h', 'danger'],
  ['OPS-302', 'New hire laptop ready', 'Laila Samir', '45m', ''],
  ['OPS-298', 'Meeting room 4B screen flickers', 'Karim Fawzy', '2h 10m', ''],
] as const;

export default function Variants() {
  return (
    <Table striped hover size='sm' responsive>
      <caption>Support tickets this week. Rows past SLA are tinted.</caption>
      <thead>
        <tr>
          <th scope='col'>Ticket</th>
          <th scope='col'>Subject</th>
          <th scope='col'>Owner</th>
          <th scope='col' className='num'>
            Open for
          </th>
        </tr>
      </thead>
      <tbody>
        {tickets.map(([id, subject, owner, age, tone]) => (
          <tr key={id} className={tone ? `table-${tone}` : undefined}>
            <td className='font-mono'>{id}</td>
            <td>{subject}</td>
            <td>{owner}</td>
            <td className='num'>{age}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

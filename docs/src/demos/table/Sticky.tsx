import { Table } from 'officehut/react';

const rows = [
  ['Accounts payable', 6, 1, 0],
  ['Accounts receivable', 5, 0, 1],
  ['Customer success', 18, 3, 2],
  ['Engineering', 41, 6, 4],
  ['Facilities', 7, 0, 0],
  ['Finance & tax', 9, 1, 0],
  ['IT support', 8, 1, 1],
  ['Legal', 3, 0, 0],
  ['Marketing', 12, 2, 1],
  ['People ops', 6, 1, 0],
  ['Procurement', 4, 0, 1],
  ['Sales', 22, 4, 3],
] as const;

export default function Sticky() {
  const sum = (i: 1 | 2 | 3) => rows.reduce((n, r) => n + r[i], 0);
  const total = [sum(1), sum(2), sum(3)] as const;
  return (
    <Table stickyHeader responsive='16rem' size='sm' hover>
      <caption>Headcount by department, 1 October</caption>
      <thead>
        <tr>
          <th scope='col'>Department</th>
          <th scope='col' className='num'>
            Staff
          </th>
          <th scope='col' className='num'>
            Open roles
          </th>
          <th scope='col' className='num'>
            Leavers (Q3)
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([dept, staff, open, left]) => (
          <tr key={dept}>
            <th scope='row'>{dept}</th>
            <td className='num'>{staff}</td>
            <td className='num'>{open}</td>
            <td className='num'>{left}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th scope='row'>Company</th>
          <td className='num'>{total[0]}</td>
          <td className='num'>{total[1]}</td>
          <td className='num'>{total[2]}</td>
        </tr>
      </tfoot>
    </Table>
  );
}

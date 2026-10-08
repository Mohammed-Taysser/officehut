import { Badge, Card, Grade } from 'officehut/react';

const VENDORS = [
  {
    name: 'Nile Freight Co.',
    what: 'Shipping',
    grade: 'A',
    pen: 'green',
    remark: 'always on time',
    spoken: 'A',
  },
  {
    name: 'Delta Print House',
    what: 'Printing',
    grade: 'B+',
    pen: 'red',
    remark: 'one misprint in Q3',
    spoken: 'B plus',
  },
  {
    name: 'Giza Catering',
    what: 'Canteen',
    grade: 'C',
    pen: 'red',
    remark: 'invoices 12 days late',
    spoken: 'C',
  },
  {
    name: 'CleanCo',
    what: 'Cleaning',
    grade: 'A-',
    pen: 'green',
    remark: 'renewed for 2027',
    spoken: 'A minus',
  },
] as const;

// Annual vendor review, marked like a report card.
export default function Vendors() {
  return (
    <Card style={{ maxWidth: 680 }}>
      <Card.Header>
        <Card.Title>Vendor review · 2026</Card.Title>
        <Card.Actions>
          <Badge color='info'>Procurement</Badge>
        </Card.Actions>
      </Card.Header>
      <Card.Body className='p-0'>
        <table className='table'>
          <caption className='visually-hidden'>Vendor ratings for 2026</caption>
          <thead>
            <tr>
              <th scope='col'>Vendor</th>
              <th scope='col'>Service</th>
              <th scope='col'>Rating</th>
            </tr>
          </thead>
          <tbody>
            {VENDORS.map((v) => (
              <tr key={v.name}>
                <th scope='row' className='fw-medium'>
                  {v.name}
                </th>
                <td className='text-muted'>{v.what}</td>
                <td>
                  <Grade
                    value={v.grade}
                    size='sm'
                    pen={v.pen}
                    label={`${v.name} rating: ${v.spoken}`}
                    remark={v.remark}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
}

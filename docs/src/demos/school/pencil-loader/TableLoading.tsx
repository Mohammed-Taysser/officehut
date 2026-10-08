import { useEffect, useState } from 'react';
import { Badge, Button, Card, PencilLoader, Table } from 'officehut/react';

const ROWS = [
  {
    no: 'PO-7731',
    vendor: 'Delta Print House',
    amount: '6,120.00',
    status: 'Approved',
  },
  {
    no: 'PO-7732',
    vendor: 'Nile Freight Co.',
    amount: '18,450.00',
    status: 'Sent',
  },
  { no: 'PO-7735', vendor: 'CleanCo', amount: '3,900.00', status: 'Draft' },
];

// The table keeps its header while the rows load, and says so in one cell.
export default function TableLoading() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(t);
  }, [loading]);

  return (
    <Card style={{ maxWidth: 640 }}>
      <Card.Header>
        <Card.Title>Purchase orders</Card.Title>
        <Card.Actions>
          <Button size='sm' onClick={() => setLoading(true)} disabled={loading}>
            Refresh
          </Button>
        </Card.Actions>
      </Card.Header>
      <Card.Body className='p-0'>
        <Table aria-busy={loading}>
          <thead>
            <tr>
              <th scope='col'>Number</th>
              <th scope='col'>Vendor</th>
              <th scope='col' className='num'>
                Amount (EGP)
              </th>
              <th scope='col'>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className='text-center py-6'>
                  <PencilLoader size='sm' label='Loading purchase orders' />
                </td>
              </tr>
            ) : (
              ROWS.map((r) => (
                <tr key={r.no}>
                  <td className='font-mono'>{r.no}</td>
                  <td>{r.vendor}</td>
                  <td className='num'>{r.amount}</td>
                  <td>
                    <Badge
                      color={
                        r.status === 'Approved'
                          ? 'success'
                          : r.status === 'Sent'
                            ? 'info'
                            : undefined
                      }
                    >
                      {r.status}
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

import { Badge, Card } from 'officehut/react';

const lines = [
  ['Freight, Cairo → Alexandria', '4,200.00'],
  ['Storage, 12 pallets', '860.00'],
];

export default function Invoice() {
  return (
    <Card stacked style={{ maxWidth: 440 }}>
      <Card.Body className='stack gap-3'>
        <div className='d-flex align-items-start gap-3'>
          <div>
            <span className='eyebrow font-mono'>INV-2041</span>
            <p className='fw-bold fs-md'>Acme Logistics</p>
            <p className='text-subtle fs-sm'>Issued 14 Sep · due 14 Oct</p>
          </div>
          <Badge variant='stamp' color='success' className='ms-auto mt-2'>
            Paid
          </Badge>
        </div>
        <div className='cluster gap-1'>
          <Badge>Logistics</Badge>
          <Badge variant='outline'>Net 30</Badge>
          <Badge color='info'>VAT 14%</Badge>
        </div>
        <table className='w-100 fs-sm'>
          <tbody>
            {lines.map(([item, amount]) => (
              <tr key={item} className='border-bottom'>
                <td className='py-1'>{item}</td>
                <td className='py-1 text-end tabular-nums'>{amount}</td>
              </tr>
            ))}
            <tr>
              <td className='py-1 fw-semibold'>Total (EGP)</td>
              <td className='py-1 text-end tabular-nums fw-semibold'>
                5,060.00
              </td>
            </tr>
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
}

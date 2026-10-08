import { Badge, Breadcrumb, Button } from 'officehut/react';

export default function PageHeader() {
  return (
    <div className='page-header mb-0'>
      <div>
        <Breadcrumb
          items={[
            { label: 'IT', href: '#it' },
            { label: 'Tickets', href: '#tickets' },
            { label: 'OPS-311' },
          ]}
        />
        <h1 className='page-title mt-2'>
          Printer on 3rd floor jams <Badge color='danger'>High</Badge>
        </h1>
        <p className='page-subtitle'>Opened by Laila Samir · 2 hours ago</p>
      </div>
      <div className='page-actions'>
        <Button variant='ghost'>Assign</Button>
        <Button color='success'>Resolve</Button>
      </div>
    </div>
  );
}

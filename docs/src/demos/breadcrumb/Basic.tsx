import { Breadcrumb } from 'officehut/react';

export default function Basic() {
  return (
    <Breadcrumb
      items={[
        { label: 'Finance', href: '#finance' },
        { label: 'Vendors', href: '#vendors' },
        { label: 'Nile Office Supplies' },
      ]}
    />
  );
}

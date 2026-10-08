import { Badge, Tabs } from 'officehut/react';

export default function Folder() {
  return (
    <Tabs defaultValue='contracts'>
      <Tabs.List variant='folder' aria-label='Vendor file'>
        <Tabs.Tab value='contracts'>Contracts</Tabs.Tab>
        <Tabs.Tab value='invoices'>Invoices</Tabs.Tab>
        <Tabs.Tab value='contacts'>Contacts</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value='contracts'>
        <div className='hstack'>
          <span>Framework agreement 2026–2028</span>
          <Badge variant='stamp' color='success' className='ms-auto'>
            Signed
          </Badge>
        </div>
      </Tabs.Panel>
      <Tabs.Panel value='invoices'>
        4 open invoices, 16,450.00 EGP in total.
      </Tabs.Panel>
      <Tabs.Panel value='contacts'>
        Hassan Ibrahim, account manager · +20 2 2345 6789
      </Tabs.Panel>
    </Tabs>
  );
}

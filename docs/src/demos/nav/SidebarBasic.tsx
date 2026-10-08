import {
  IconBuildingStore,
  IconCalendarTime,
  IconChecklist,
  IconFileInvoice,
  IconLayoutDashboard,
  IconNotebook,
  IconReceipt,
  IconSettings,
  IconTicket,
  IconUsers,
} from '@tabler/icons-react';
import { Avatar, Nav, Sidebar, type NavEntry } from 'officehut/react';

const items: NavEntry[] = [
  { label: 'Overview', href: '#overview', icon: <IconLayoutDashboard /> },
  { heading: 'Money' },
  {
    label: 'Invoices',
    href: '#invoices',
    icon: <IconFileInvoice />,
    badge: 12,
  },
  { label: 'Expenses', href: '#expenses', icon: <IconReceipt /> },
  {
    label: 'Approvals',
    id: 'approvals',
    icon: <IconChecklist />,
    badge: 4,
    items: [
      { label: 'Purchase orders', href: '#approvals/po' },
      { label: 'Leave requests', href: '#approvals/leave' },
      { label: 'Overtime', href: '#approvals/overtime' },
    ],
  },
  { heading: 'People & places' },
  { label: 'Rota', href: '#rota', icon: <IconCalendarTime /> },
  { label: 'Staff', href: '#staff', icon: <IconUsers /> },
  { label: 'Vendors', href: '#vendors', icon: <IconBuildingStore /> },
  { label: 'Tickets', href: '#tickets', icon: <IconTicket />, badge: '3 new' },
  { label: 'Settings', href: '#settings', icon: <IconSettings /> },
];

export default function SidebarBasic() {
  return (
    <div style={{ height: 420 }}>
      <Sidebar
        static
        aria-label='Back office'
        brand={
          <Sidebar.Brand href='#'>
            <IconNotebook aria-hidden />
            Halden &amp; Co.
          </Sidebar.Brand>
        }
        footer={
          <>
            <Avatar name='Mona Adel' size='sm' circle aria-hidden />
            <div className='min-w-0'>
              <div className='fw-semibold text-truncate'>Mona Adel</div>
              <div className='fs-xs text-muted'>Office manager</div>
            </div>
          </>
        }
      >
        <Nav items={items} currentHref='#approvals/leave' />
      </Sidebar>
    </div>
  );
}

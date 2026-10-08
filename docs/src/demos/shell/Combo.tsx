import {
  IconBell,
  IconBuildingStore,
  IconCalendarTime,
  IconChecklist,
  IconFileExport,
  IconFileInvoice,
  IconLayoutDashboard,
  IconNotebook,
  IconPlus,
  IconReceipt,
  IconTicket,
} from '@tabler/icons-react';
import { useState } from 'react';
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Nav,
  Navbar,
  Pagination,
  Sidebar,
  Steps,
  type NavEntry,
} from 'officehut/react';

const nav: NavEntry[] = [
  { label: 'Overview', href: '#overview', icon: <IconLayoutDashboard /> },
  { heading: 'Money' },
  {
    label: 'Invoices',
    href: '#invoices',
    icon: <IconFileInvoice />,
    badge: 233,
  },
  { label: 'Expenses', href: '#expenses', icon: <IconReceipt /> },
  {
    label: 'Approvals',
    id: 'approvals',
    icon: <IconChecklist />,
    badge: 4,
    items: [
      { label: 'Purchase orders', href: '#po' },
      { label: 'Leave requests', href: '#leave' },
    ],
  },
  { heading: 'Operations' },
  { label: 'Rota', href: '#rota', icon: <IconCalendarTime /> },
  { label: 'Vendors', href: '#vendors', icon: <IconBuildingStore /> },
  { label: 'Tickets', href: '#tickets', icon: <IconTicket /> },
];

export default function Combo() {
  const [drawer, setDrawer] = useState(false);
  const [page, setPage] = useState(1);

  return (
    // Preview frame only: a fixed height, and `contain: paint` so the pinned
    // sidebar and the drawer stay inside the box instead of the window.
    <div
      className='border rounded-lg'
      style={{ height: 420, overflow: 'hidden', contain: 'paint' }}
    >
      <div className='shell' style={{ minHeight: 0, height: '100%' }}>
        <Sidebar
          id='demo-shell-sidebar'
          aria-label='Back office'
          open={drawer}
          onClose={() => setDrawer(false)}
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
          <Nav items={nav} currentHref='#invoices' label='Back office' />
        </Sidebar>

        <Navbar
          start={
            <>
              <Navbar.Toggle
                aria-label='Open menu'
                aria-controls='demo-shell-sidebar'
                aria-expanded={drawer}
                onClick={() => setDrawer(true)}
              />
              <Breadcrumb
                items={[{ label: 'Money', href: '#' }, { label: 'Invoices' }]}
                className='d-none d-sm-block'
              />
            </>
          }
          end={
            <>
              <Button
                iconOnly
                variant='ghost'
                aria-label='Notifications, 2 unread'
              >
                <IconBell />
                <Badge color='danger' corner>
                  2
                </Badge>
              </Button>
              <Avatar name='Mona Adel' size='sm' circle />
            </>
          }
        />

        {/* In your app this is <main>; a demo can't add a second one to the docs page. */}
        <div className='shell-main bg-paper' style={{ overflow: 'auto' }}>
          <div className='container-fluid page'>
            <div className='page-header'>
              <div>
                <span className='eyebrow'>Money</span>
                <h2 className='page-title'>Invoices</h2>
                <p className='page-subtitle m-0'>
                  233 open · EGP 48,210.00 outstanding
                </p>
              </div>
              <div className='page-actions'>
                <Button icon={<IconFileExport />}>Export</Button>
                <Button color='primary' icon={<IconPlus />}>
                  New invoice
                </Button>
              </div>
            </div>

            <Card>
              <Card.Header>
                <Card.Title>INV-2041 · Nile Office Supplies</Card.Title>
                <Card.Actions>
                  <Badge color='warning'>Awaiting finance</Badge>
                </Card.Actions>
              </Card.Header>
              <Card.Body>
                <Steps
                  size='sm'
                  current={2}
                  aria-label='INV-2041 approval route'
                  items={[
                    { title: 'Submitted', description: 'Salma · 02 Oct' },
                    { title: 'Manager', description: 'Omar · 03 Oct' },
                    { title: 'Finance' },
                    { title: 'Paid' },
                  ]}
                />
              </Card.Body>
              <Card.Footer>
                <div className='pagination-bar w-100'>
                  <span className='pagination-info'>
                    Invoice <strong>{page}</strong> of 12 awaiting you
                  </span>
                  <Pagination
                    total={12}
                    page={page}
                    onChange={setPage}
                    variant='compact'
                    size='sm'
                    label='Invoices awaiting approval'
                  />
                </div>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

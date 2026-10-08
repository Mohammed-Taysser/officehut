import { IconBell, IconNotebook } from '@tabler/icons-react';
import { Avatar, Badge, Button, Navbar } from 'officehut/react';

export default function NavbarBasic() {
  return (
    <Navbar
      brand={
        <Navbar.Brand href='#'>
          <IconNotebook aria-hidden />
          Halden &amp; Co.
        </Navbar.Brand>
      }
      end={
        <>
          <Navbar.Text className='d-none d-md-inline'>FY 2026 · Q4</Navbar.Text>
          <Navbar.Divider className='d-none d-md-block' />
          <Button iconOnly variant='ghost' aria-label='Notifications, 3 unread'>
            <IconBell />
            <Badge color='danger' corner>
              3
            </Badge>
          </Button>
          <Avatar name='Mona Adel' size='sm' circle />
        </>
      }
    >
      <Navbar.Link href='#' active>
        Dashboard
      </Navbar.Link>
      <Navbar.Link href='#'>Invoices</Navbar.Link>
      <Navbar.Link href='#'>Rota</Navbar.Link>
      <Navbar.Link href='#'>Tickets</Navbar.Link>
      <Navbar.Link href='#'>Vendors</Navbar.Link>
    </Navbar>
  );
}

import { IconNotebook } from '@tabler/icons-react';
import { Avatar, Button, Navbar, Pagination } from 'officehut/react';

const rota: [day: string, who: string, desk: string, hours: string][] = [
  ['Mon 13', 'Salma Nour', 'Front desk', '08:00–16:00'],
  ['Mon 13', 'Youssef Amin', 'Post room', '09:00–17:00'],
  ['Tue 14', 'Omar Fathy', 'Front desk', '08:00–16:00'],
  ['Tue 14', 'Mona Adel', 'Meeting rooms', '10:00–18:00'],
  ['Wed 15', 'Karim Saleh', 'Front desk', '08:00–16:00'],
  ['Wed 15', 'Salma Nour', 'Post room', '09:00–17:00'],
];

export default function TopNav() {
  return (
    // No sidebar? Skip `.shell`: a sticky navbar over a page is enough.
    <div
      className='border rounded-lg bg-paper'
      style={{ height: 420, overflow: 'auto' }}
    >
      <Navbar
        sticky
        brand={
          <Navbar.Brand href='#'>
            <IconNotebook aria-hidden />
            Halden
          </Navbar.Brand>
        }
        end={<Avatar name='Omar Fathy' size='sm' circle />}
      >
        <Navbar.Link href='#'>Dashboard</Navbar.Link>
        <Navbar.Link href='#' active>
          Rota
        </Navbar.Link>
        <Navbar.Link href='#'>Leave</Navbar.Link>
        <Navbar.Link href='#'>Timesheets</Navbar.Link>
      </Navbar>

      <div className='container page'>
        <div className='page-header'>
          <div>
            <span className='eyebrow'>Week 42</span>
            <h2 className='page-title'>Rota</h2>
            <p className='page-subtitle m-0'>
              13–19 October · 5 people · 2 desks short on Friday
            </p>
          </div>
          <div className='page-actions'>
            <Button size='sm'>Swap shift</Button>
            <Button size='sm' color='primary'>
              Publish rota
            </Button>
          </div>
        </div>
        <ul className='stack gap-2 m-0 p-0' style={{ listStyle: 'none' }}>
          {rota.map(([day, who, desk, hours]) => (
            <li
              key={`${day}-${who}`}
              className='d-flex gap-3 align-items-baseline border-bottom pb-2'
            >
              <span
                className='font-mono fs-sm text-muted'
                style={{ width: '4.5rem' }}
              >
                {day}
              </span>
              <span className='fw-medium'>{who}</span>
              <span className='text-muted'>{desk}</span>
              <span className='font-mono fs-sm ms-auto'>{hours}</span>
            </li>
          ))}
        </ul>
        <div className='d-flex justify-content-center mt-5'>
          <Pagination
            total={6}
            defaultPage={2}
            variant='compact'
            label='Rota weeks'
          />
        </div>
      </div>
    </div>
  );
}

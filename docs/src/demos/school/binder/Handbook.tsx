import { Tabs } from 'officehut/react';

const SECTIONS = [
  {
    id: 'welcome',
    label: '1 · Welcome',
    title: 'Welcome to the team',
    text: 'Office hours are 9:00 to 17:00, Sunday to Thursday. Your manager will agree core hours with you in week one.',
  },
  {
    id: 'leave',
    label: '2 · Leave',
    title: 'Leave and holidays',
    text: '21 days of annual leave, plus public holidays. Up to 10 unused days carry over to the next year. Book through the HR portal at least two weeks ahead.',
  },
  {
    id: 'expenses',
    label: '3 · Expenses',
    title: 'Expenses',
    text: 'Claims go in within 30 days, with a photo of every receipt. Anything over EGP 5,000 needs your manager’s approval first.',
  },
  {
    id: 'it',
    label: '4 · IT',
    title: 'IT and security',
    text: 'Lock your screen when you leave your desk (Win + L). Two-factor sign-in is required for email and the HR portal.',
  },
  {
    id: 'safety',
    label: '5 · Safety',
    title: 'Health and safety',
    text: 'Fire exits are at both ends of every floor. The assembly point is gate B. First-aid kits are next to each kitchen.',
  },
];

export default function Handbook() {
  return (
    <Tabs defaultValue='leave'>
      <div className='binder' style={{ maxWidth: 720 }}>
        <Tabs.List variant='index' aria-label='Handbook sections'>
          {SECTIONS.map((s) => (
            <Tabs.Tab key={s.id} value={s.id}>
              {s.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {SECTIONS.map((s) => (
          <Tabs.Panel key={s.id} value={s.id}>
            <span className='eyebrow'>Employee handbook · 2026 edition</span>
            <h3 className='mt-1'>{s.title}</h3>
            <p className='mt-2'>{s.text}</p>
          </Tabs.Panel>
        ))}
      </div>
    </Tabs>
  );
}

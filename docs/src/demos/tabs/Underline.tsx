import { Badge, Tabs } from 'officehut/react';

export default function Underline() {
  return (
    <Tabs defaultValue='open'>
      <Tabs.List aria-label='Tickets'>
        <Tabs.Tab value='open'>
          Open <Badge>12</Badge>
        </Tabs.Tab>
        <Tabs.Tab value='mine'>Assigned to me</Tabs.Tab>
        <Tabs.Tab value='closed'>Closed</Tabs.Tab>
        <Tabs.Tab value='archived' disabled>
          Archived
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value='open'>
        12 open tickets, 3 of them high priority.
      </Tabs.Panel>
      <Tabs.Panel value='mine'>OPS-311 and OPS-309 are yours.</Tabs.Panel>
      <Tabs.Panel value='closed'>48 tickets closed this month.</Tabs.Panel>
    </Tabs>
  );
}

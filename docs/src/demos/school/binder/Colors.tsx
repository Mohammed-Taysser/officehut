import { Tabs } from 'officehut/react';

// Dividers cycle yellow, pink, blue, green, orange. Set --_tab on a tab to pick your own.
export default function Colors() {
  return (
    <Tabs defaultValue='q1'>
      <div className='binder' style={{ maxWidth: 560 }}>
        <Tabs.List variant='index' aria-label='Board minutes by quarter'>
          <Tabs.Tab value='q1'>Q1</Tabs.Tab>
          <Tabs.Tab value='q2'>Q2</Tabs.Tab>
          <Tabs.Tab value='q3'>Q3</Tabs.Tab>
          <Tabs.Tab
            value='archive'
            style={{ ['--_tab' as string]: 'var(--oh-sunken)' }}
          >
            Archive
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='q1'>Minutes of 12 January and 9 March.</Tabs.Panel>
        <Tabs.Panel value='q2'>Minutes of 4 May and 22 June.</Tabs.Panel>
        <Tabs.Panel value='q3'>
          Minutes of 10 August and 28 September.
        </Tabs.Panel>
        <Tabs.Panel value='archive'>
          2019–2025, scanned. Ask the company secretary for originals.
        </Tabs.Panel>
      </div>
    </Tabs>
  );
}

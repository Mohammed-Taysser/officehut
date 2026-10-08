import { Button, ButtonList, Tabs } from 'officehut/react';

// Click into the preview, then press Tab. The ring only shows for keyboard focus.
export default function Focus() {
  return (
    <div className='stack gap-4'>
      <ButtonList>
        <Button color='primary'>Submit timesheet</Button>
        <Button variant='outline'>Save draft</Button>
        <a href='#focus-rings'>Timesheet policy</a>
      </ButtonList>
      <Tabs defaultValue='week'>
        <Tabs.List aria-label='Period'>
          <Tabs.Tab value='week'>This week</Tabs.Tab>
          <Tabs.Tab value='last'>Last week</Tabs.Tab>
          <Tabs.Tab value='month'>October</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </div>
  );
}

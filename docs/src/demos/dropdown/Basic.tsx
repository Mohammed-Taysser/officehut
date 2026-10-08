import { Button, Dropdown } from 'officehut/react';

export default function Basic() {
  return (
    <Dropdown trigger={<Button className='dropdown-toggle'>Export</Button>}>
      <Dropdown.Item>CSV for Excel</Dropdown.Item>
      <Dropdown.Item>PDF report</Dropdown.Item>
      <Dropdown.Item>Send to accounting</Dropdown.Item>
    </Dropdown>
  );
}

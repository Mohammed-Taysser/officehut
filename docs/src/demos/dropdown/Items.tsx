import {
  IconCopy,
  IconDownload,
  IconEdit,
  IconPrinter,
  IconTrash,
} from '@tabler/icons-react';
import { Button, Dropdown } from 'officehut/react';

export default function Items() {
  return (
    <Dropdown
      trigger={<Button className='dropdown-toggle'>INV-2041</Button>}
      aria-label='Invoice actions'
    >
      <Dropdown.Header>Invoice</Dropdown.Header>
      <Dropdown.Item icon={<IconEdit />} shortcut='E'>
        Edit
      </Dropdown.Item>
      <Dropdown.Item icon={<IconCopy />} shortcut='⌘D'>
        Duplicate
      </Dropdown.Item>
      <Dropdown.Item icon={<IconPrinter />} shortcut='⌘P'>
        Print
      </Dropdown.Item>
      <Dropdown.Item icon={<IconDownload />} disabled>
        Download (still generating)
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item icon={<IconTrash />} danger>
        Void invoice
      </Dropdown.Item>
    </Dropdown>
  );
}

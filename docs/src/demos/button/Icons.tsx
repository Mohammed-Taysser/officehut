import {
  IconDownload,
  IconPaperclip,
  IconPrinter,
  IconSend,
  IconTrash,
} from '@tabler/icons-react';
import { Button, ButtonList } from 'officehut/react';

export default function Icons() {
  return (
    <ButtonList>
      <Button color='primary' icon={<IconSend />}>
        Send invoice
      </Button>
      <Button iconEnd={<IconDownload />}>Download PDF</Button>
      <Button iconOnly aria-label='Print'>
        <IconPrinter />
      </Button>
      <Button iconOnly variant='ghost' aria-label='Attach file'>
        <IconPaperclip />
      </Button>
      <Button iconOnly color='danger' variant='soft' aria-label='Delete'>
        <IconTrash />
      </Button>
    </ButtonList>
  );
}

import {
  IconArrowBackUp,
  IconBold,
  IconItalic,
  IconList,
  IconPaperclip,
} from '@tabler/icons-react';
import { Button, ButtonList, Card, Tooltip } from 'officehut/react';

const TOOLS = [
  { label: 'Bold', key: 'Ctrl+B', Icon: IconBold },
  { label: 'Italic', key: 'Ctrl+I', Icon: IconItalic },
  { label: 'Bulleted list', key: 'Ctrl+Shift+8', Icon: IconList },
  { label: 'Attach a file', key: 'up to 10 MB', Icon: IconPaperclip },
  { label: 'Undo', key: 'Ctrl+Z', Icon: IconArrowBackUp },
];

export default function Toolbar() {
  return (
    <Card style={{ maxWidth: 520 }}>
      <Card.Header>
        <ButtonList attached aria-label='Formatting'>
          {TOOLS.map(({ label, key, Icon }) => (
            <Tooltip
              key={label}
              content={`${label} · ${key}`}
              placement='bottom'
            >
              <Button size='sm' iconOnly variant='ghost' aria-label={label}>
                <Icon />
              </Button>
            </Tooltip>
          ))}
        </ButtonList>
      </Card.Header>
      <Card.Body>
        <p className='text-muted'>
          Reply to OPS-311: the technician comes on Thursday morning…
        </p>
      </Card.Body>
    </Card>
  );
}

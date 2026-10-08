import { IconLock, IconPrinter } from '@tabler/icons-react';
import { Button, ButtonList, Tooltip } from 'officehut/react';

export default function Basic() {
  return (
    <ButtonList>
      <Tooltip content='Prints on the 3rd floor printer'>
        <Button iconOnly aria-label='Print'>
          <IconPrinter />
        </Button>
      </Tooltip>
      {/* A disabled button gets no hover or focus, so the wrapper carries the tooltip. */}
      <Tooltip content='Locked by Mona Adel until 16:00'>
        <span tabIndex={0} className='d-inline-block rounded'>
          <Button icon={<IconLock />} disabled>
            Edit budget
          </Button>
        </span>
      </Tooltip>
    </ButtonList>
  );
}

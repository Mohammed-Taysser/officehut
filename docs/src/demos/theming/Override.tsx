import type { CSSProperties } from 'react';
import { Badge, Button, ButtonList } from 'officehut/react';

// A subtree with its own primary colour and squarer corners.
// data-oh-theme makes the derived tints (-soft, -ink, -line) follow the new colour.
const branded = {
  '--oh-primary': '#0b6e4f',
  '--oh-radius': '2px',
  '--oh-radius-sm': '1px',
} as CSSProperties;

function Sample() {
  return (
    <ButtonList>
      <Button color='primary'>Post journal</Button>
      <Button color='primary' variant='soft'>
        Preview
      </Button>
      <Badge color='primary' variant='stamp'>
        Posted
      </Badge>
    </ButtonList>
  );
}

export default function Override() {
  return (
    <div className='grid cols-1 cols-md-2'>
      <div className='stack gap-2'>
        <span className='eyebrow'>Default</span>
        <Sample />
      </div>
      <div
        className='stack gap-2 p-3 rounded'
        data-oh-theme='light'
        style={branded}
      >
        <span className='eyebrow'>Overridden on this element</span>
        <Sample />
      </div>
    </div>
  );
}

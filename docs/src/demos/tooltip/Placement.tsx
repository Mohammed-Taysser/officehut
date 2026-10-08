import { Button, Tooltip, type Placement as Side } from 'officehut/react';

const SIDES: Side[] = ['top', 'right', 'bottom', 'left'];

export default function Placement() {
  return (
    <div className='cluster gap-3'>
      {SIDES.map((side) => (
        <Tooltip key={side} content={`Opens ${side}`} placement={side}>
          <Button>{side}</Button>
        </Tooltip>
      ))}
    </div>
  );
}

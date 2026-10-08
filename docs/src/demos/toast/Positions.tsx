import { Button, ButtonList, toast, type ToastOptions } from 'officehut/react';

const POSITIONS: NonNullable<ToastOptions['position']>[] = [
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
];

export default function Positions() {
  return (
    <ButtonList>
      {POSITIONS.map((position) => (
        <Button
          key={position}
          onClick={() =>
            toast({ message: `Shown ${position}`, position, duration: 3000 })
          }
        >
          {position}
        </Button>
      ))}
    </ButtonList>
  );
}

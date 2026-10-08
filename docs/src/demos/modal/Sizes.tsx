import { useState } from 'react';
import { Button, ButtonList, Modal } from 'officehut/react';

const SIZES = ['sm', 'md', 'lg', 'xl'] as const;

export default function Sizes() {
  const [size, setSize] = useState<(typeof SIZES)[number]>('md');
  const [open, setOpen] = useState(false);
  return (
    <>
      <ButtonList>
        {SIZES.map((s) => (
          <Button
            key={s}
            onClick={() => {
              setSize(s);
              setOpen(true);
            }}
          >
            {s}
          </Button>
        ))}
      </ButtonList>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size={size}
        title={`size="${size}"`}
      >
        <p>
          sm 24rem · md 32rem · lg 48rem · xl 72rem. On narrow screens every
          size leaves a 1rem margin on each side.
        </p>
      </Modal>
    </>
  );
}

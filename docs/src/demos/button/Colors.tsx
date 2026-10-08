import { Button, ButtonList, COLORS } from 'officehut/react';

export default function Colors() {
  return (
    <div className='stack gap-3'>
      <ButtonList>
        {COLORS.map((color) => (
          <Button key={color} color={color}>
            {color}
          </Button>
        ))}
      </ButtonList>
      <ButtonList>
        {COLORS.map((color) => (
          <Button key={color} color={color} variant='soft'>
            {color}
          </Button>
        ))}
      </ButtonList>
    </div>
  );
}

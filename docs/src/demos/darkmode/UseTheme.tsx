import { Button, ButtonList, useTheme, type Theme } from 'officehut/react';

const OPTIONS: [Theme, string][] = [
  ['light', 'Day'],
  ['dark', 'Night shift'],
  ['auto', 'Follow system'],
];

export default function UseTheme() {
  const [theme, setTheme] = useTheme();
  return (
    <div className='stack gap-2'>
      <ButtonList attached aria-label='Theme'>
        {OPTIONS.map(([value, label]) => (
          <Button
            key={value}
            aria-pressed={theme === value}
            onClick={() => setTheme(value)}
          >
            {label}
          </Button>
        ))}
      </ButtonList>
      <p className='text-subtle fs-sm'>
        Current: <code>{theme}</code>. The docs header switch stays in sync.
      </p>
    </div>
  );
}

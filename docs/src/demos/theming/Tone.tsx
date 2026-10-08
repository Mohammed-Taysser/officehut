import type { CSSProperties } from 'react';
import { Alert, Badge, Button } from 'officehut/react';

// Any coloured component reads the five --_c* variables.
// Set them yourself for a one-off colour that isn't in the palette.
const teal = '#0f766e';
const tone = {
  '--_c': teal,
  '--_c-fg': '#fff',
  '--_c-soft': `color-mix(in oklab, ${teal} 13%, var(--oh-surface))`,
  '--_c-ink': `color-mix(in oklab, ${teal} 78%, var(--oh-ink))`,
  '--_c-line': `color-mix(in oklab, ${teal} 40%, var(--oh-surface))`,
} as CSSProperties;

export default function Tone() {
  return (
    <div className='stack gap-3' style={tone}>
      <Alert title='Fiscal year closes on 31 December' icon>
        Lock your cost centres by the 20th so finance can reconcile.
      </Alert>
      <div className='hstack'>
        <Button variant='soft'>Download ledger</Button>
        <Button variant='outline'>Cost centres</Button>
        <Badge variant='stamp'>FY 2026</Badge>
      </div>
    </div>
  );
}

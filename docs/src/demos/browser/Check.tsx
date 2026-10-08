import { useState } from 'react';
import { Badge } from 'officehut/react';

const FEATURES: [string, () => boolean][] = [
  [
    'color-mix()',
    () => CSS.supports('color', 'color-mix(in oklab, red 50%, blue)'),
  ],
  [':has()', () => CSS.supports('selector(:has(a))')],
  [
    '<dialog>.showModal()',
    () =>
      typeof HTMLDialogElement === 'function' &&
      'showModal' in HTMLDialogElement.prototype,
  ],
  ['<details name>', () => 'name' in HTMLDetailsElement.prototype],
  ['Logical properties', () => CSS.supports('margin-inline-start', '1px')],
  ['inert', () => 'inert' in HTMLElement.prototype],
  [
    'interpolate-size (optional)',
    () => CSS.supports('interpolate-size', 'allow-keywords'),
  ],
  [
    '::details-content (optional)',
    () => CSS.supports('selector(::details-content)'),
  ],
];

export default function Check() {
  // Runs once, in the browser, when the demo mounts.
  const [results] = useState<[string, boolean][]>(() =>
    FEATURES.map(([name, test]) => [name, test()]),
  );

  return (
    <ul className='list-unstyled stack gap-2'>
      {results.map(([name, ok]) => (
        <li key={name} className='hstack'>
          <code>{name}</code>
          <Badge
            color={ok ? 'success' : 'warning'}
            variant='stamp'
            className='ms-auto'
          >
            {ok ? 'Yes' : 'No'}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

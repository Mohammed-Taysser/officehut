import { cx } from '../../../shared/cx.js';
import type { Size } from '../../../shared/tokens.js';

/** `box` (default), `line` — a ruled line to write on — or `signature`. */
export type InputVariant = 'box' | 'line' | 'signature';

/** Class list shared by Input, Textarea and Select. */
export function controlClass({
  size,
  variant,
  invalid,
  valid,
  className,
}: {
  size: Size;
  variant: InputVariant;
  invalid: boolean;
  valid?: boolean;
  className?: string;
}) {
  return cx(
    'input',
    size !== 'md' && `input-${size}`,
    variant === 'line' && 'input-line',
    variant === 'signature' && 'input-line input-signature',
    invalid && 'is-invalid',
    valid && !invalid && 'is-valid',
    className,
  );
}

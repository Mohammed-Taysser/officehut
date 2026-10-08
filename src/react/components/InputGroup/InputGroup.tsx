import type { ComponentPropsWithRef } from 'react';
import { cx } from '../../../shared/cx.js';
import type { Size } from '../../../shared/tokens.js';

export interface InputGroupProps extends ComponentPropsWithRef<'div'> {
  /** Sizes every input, addon and button inside. */
  size?: Size;
}

/**
 * Joins inputs, printed addons (`InputGroup.Text`) and buttons into one strip.
 * Put the `<Field>` around the group, not inside it, so the label targets the input.
 */
export function InputGroup({
  size = 'md',
  className,
  ...rest
}: InputGroupProps) {
  return (
    <div
      {...rest}
      className={cx(
        'input-group',
        size !== 'md' && `input-group-${size}`,
        className,
      )}
    />
  );
}

/** A printed addon cell: currency, unit, domain. */
export function InputGroupText({
  className,
  ...rest
}: ComponentPropsWithRef<'span'>) {
  return <span {...rest} className={cx('input-group-text', className)} />;
}

InputGroup.Text = InputGroupText;

import type { ComponentPropsWithRef } from 'react';
import type { Size } from '../../../shared/tokens.js';
import { useField } from '../Field/Field.js';
import { controlClass } from '../Field/control.js';

export interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
  size?: Size;
  /** `box` (default) or `line` — ruled lines, snaps to a `.notebook` page. */
  variant?: 'box' | 'line';
  invalid?: boolean;
  valid?: boolean;
}

/** Native `<textarea>`; resizes vertically. */
export function Textarea({
  size = 'md',
  variant = 'box',
  invalid,
  valid,
  className,
  id,
  required,
  disabled,
  'aria-describedby': describedBy,
  'aria-invalid': ariaInvalid,
  ...rest
}: TextareaProps) {
  const field = useField({
    id,
    required,
    disabled,
    invalid,
    'aria-describedby': describedBy,
    'aria-invalid': ariaInvalid,
  });
  return (
    <textarea
      {...rest}
      id={field.id}
      required={field.required}
      disabled={field.disabled}
      aria-invalid={field['aria-invalid']}
      aria-describedby={field['aria-describedby']}
      className={controlClass({
        size,
        variant,
        invalid: field.invalid,
        valid,
        className,
      })}
    />
  );
}

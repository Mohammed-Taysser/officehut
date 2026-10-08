import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { Size } from '../../../shared/tokens.js';
import { useField } from '../Field/Field.js';
import { controlClass, type InputVariant } from '../Field/control.js';

export type { InputVariant };

export interface InputProps extends Omit<
  ComponentPropsWithRef<'input'>,
  'size'
> {
  size?: Size;
  /** `box` (default), `line` — a ruled line to write on — or `signature`. */
  variant?: InputVariant;
  /** Red border + `aria-invalid`. Inside a `<Field error>` this is set for you. */
  invalid?: boolean;
  /** Green border once a value has been checked. */
  valid?: boolean;
  /** Icon (or short text) inside the field, at the start. Decorative. */
  icon?: ReactNode;
  /** Icon or button inside the field, at the end. */
  iconEnd?: ReactNode;
}

/** Native `<input>` with officehut styling. Controlled or uncontrolled, like the element. */
export function Input({
  size = 'md',
  variant = 'box',
  invalid,
  valid,
  icon,
  iconEnd,
  className,
  id,
  required,
  disabled,
  'aria-describedby': describedBy,
  'aria-invalid': ariaInvalid,
  ...rest
}: InputProps) {
  const field = useField({
    id,
    required,
    disabled,
    invalid,
    'aria-describedby': describedBy,
    'aria-invalid': ariaInvalid,
  });
  const input = (
    <input
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
  if (!icon && !iconEnd) return input;

  return (
    <div className='input-icon'>
      {icon && (
        <span className='input-icon-addon' aria-hidden>
          {icon}
        </span>
      )}
      {input}
      {iconEnd && <span className='input-icon-addon'>{iconEnd}</span>}
    </div>
  );
}

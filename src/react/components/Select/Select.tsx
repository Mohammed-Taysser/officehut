import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { Size } from '../../../shared/tokens.js';
import { useField } from '../Field/Field.js';
import { controlClass } from '../Field/control.js';

export type SelectOption =
  string | { value: string; label?: ReactNode; disabled?: boolean };

export interface SelectProps extends Omit<
  ComponentPropsWithRef<'select'>,
  'size'
> {
  size?: Size;
  /** `box` (default) or `line`. */
  variant?: 'box' | 'line';
  invalid?: boolean;
  valid?: boolean;
  /** Shorthand for `<option>` children. Strings are used as value and label. */
  options?: SelectOption[];
  /**
   * First, empty option ("Choose a cost centre…"). Shown greyed while selected;
   * with `required` the browser treats it as "no answer yet".
   */
  placeholder?: string;
  /** Native `size` attribute (visible rows), since `size` is the control size. */
  rows?: number;
}

/** Native `<select>` with a drawn chevron. */
export function Select({
  size = 'md',
  variant = 'box',
  invalid,
  valid,
  options,
  placeholder,
  rows,
  className,
  children,
  id,
  required,
  disabled,
  'aria-describedby': describedBy,
  'aria-invalid': ariaInvalid,
  ...rest
}: SelectProps) {
  const field = useField({
    id,
    required,
    disabled,
    invalid,
    'aria-describedby': describedBy,
    'aria-invalid': ariaInvalid,
  });
  return (
    <select
      {...rest}
      size={rows}
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
    >
      {placeholder !== undefined && <option value=''>{placeholder}</option>}
      {options?.map((o) =>
        typeof o === 'string' ? (
          <option key={o} value={o}>
            {o}
          </option>
        ) : (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label ?? o.value}
          </option>
        ),
      )}
      {children}
    </select>
  );
}

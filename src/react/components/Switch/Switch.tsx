import { useId, type ComponentPropsWithRef, type ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';
import type { Color, Size } from '../../../shared/tokens.js';
import { CheckLayout } from '../Checkbox/CheckLayout.js';
import { useField } from '../Field/Field.js';

export interface SwitchProps extends Omit<
  ComponentPropsWithRef<'input'>,
  'type' | 'size' | 'role'
> {
  /** The label — name the setting, not the state ("Email receipts", not "On"). */
  children?: ReactNode;
  hint?: ReactNode;
  /** Track colour when on. */
  color?: Color;
  size?: Size;
  /** Label first, switch at the far edge — for settings lists. */
  reverse?: boolean;
  /** Print I / O marks on the track, like office equipment. */
  io?: boolean;
  invalid?: boolean;
  /** Class for the `<input>`; `className` goes on the wrapper. */
  inputClassName?: string;
}

/**
 * `<input type="checkbox" role="switch">` — Space toggles it, screen readers
 * announce "on / off". Use for settings that apply immediately.
 */
export function Switch({
  children,
  hint,
  color,
  size = 'md',
  reverse,
  io,
  invalid,
  className,
  inputClassName,
  id,
  required,
  disabled,
  'aria-describedby': describedBy,
  'aria-invalid': ariaInvalid,
  ...rest
}: SwitchProps) {
  const ownId = useId();
  const field = useField({
    id,
    required,
    disabled,
    invalid,
    'aria-describedby': describedBy,
    'aria-invalid': ariaInvalid,
  });
  const inputId = field.id ?? ownId;
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    <CheckLayout
      base='switch'
      className={cx(
        'switch',
        color && `switch-${color}`,
        size !== 'md' && `switch-${size}`,
        reverse && 'switch-reverse',
        io && 'switch-io',
        className,
      )}
      inputId={inputId}
      label={children}
      hint={hint}
      hintId={hintId}
      input={
        <input
          {...rest}
          type='checkbox'
          role='switch'
          id={inputId}
          required={field.required}
          disabled={field.disabled}
          aria-invalid={field['aria-invalid']}
          aria-describedby={cx(field['aria-describedby'], hintId) || undefined}
          className={cx(
            'switch-input',
            field.invalid && 'is-invalid',
            inputClassName,
          )}
        />
      }
    />
  );
}

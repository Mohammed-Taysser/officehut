import {
  createContext,
  useId,
  type ChangeEvent,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import { cx } from '../../../shared/cx.js';

export interface RadioGroupContextValue {
  name: string;
  value: string | undefined;
  defaultValue: string | undefined;
  onChange:
    ((value: string, event: ChangeEvent<HTMLInputElement>) => void) | undefined;
  required: boolean | undefined;
  invalid: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(
  null,
);

export interface RadioGroupProps extends Omit<
  ComponentPropsWithRef<'fieldset'>,
  'onChange' | 'defaultValue'
> {
  /** Visible group name, rendered as the `<legend>`. */
  label: ReactNode;
  /** Shared `name` for the radios. Generated if omitted. */
  name?: string;
  /** Controlled value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  hint?: ReactNode;
  error?: ReactNode;
  invalid?: boolean;
  required?: boolean;
  /** Options in a row instead of a column. */
  inline?: boolean;
}

/**
 * A `<fieldset role="radiogroup">` with a legend. The radios inside share one
 * `name`, so arrow keys, Tab and form submission are the browser's own.
 */
export function RadioGroup({
  label,
  name,
  value,
  defaultValue,
  onChange,
  hint,
  error,
  invalid,
  required,
  inline,
  className,
  children,
  ...rest
}: RadioGroupProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const isInvalid = invalid ?? Boolean(error);

  return (
    <fieldset
      role='radiogroup'
      aria-required={required || undefined}
      aria-invalid={isInvalid || undefined}
      aria-describedby={cx(errorId, hintId) || undefined}
      {...rest}
      className={cx('check-group', inline && 'check-group-inline', className)}
    >
      <legend className='label'>
        {label}
        {required && (
          <span className='label-required' aria-hidden>
            *
          </span>
        )}
      </legend>
      <RadioGroupContext
        value={{
          name: name ?? id,
          value,
          defaultValue,
          onChange,
          required,
          invalid: isInvalid,
        }}
      >
        {children}
      </RadioGroupContext>
      {hint && (
        <p className='field-hint' id={hintId}>
          {hint}
        </p>
      )}
      {error && (
        <p className='field-error' id={errorId}>
          {error}
        </p>
      )}
    </fieldset>
  );
}

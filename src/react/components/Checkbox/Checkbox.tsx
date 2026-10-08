import {
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import { cx } from '../../../shared/cx.js';
import type { Color, Size } from '../../../shared/tokens.js';
import { useField } from '../Field/Field.js';
import { CheckLayout, mergeRefs } from './CheckLayout.js';

export interface CheckboxProps extends Omit<
  ComponentPropsWithRef<'input'>,
  'type' | 'size'
> {
  /** The label. */
  children?: ReactNode;
  /** Quieter line under the label, linked with `aria-describedby`. */
  hint?: ReactNode;
  /** "Some of these" — a dash instead of a tick. Clicking clears it, so keep it in state. */
  indeterminate?: boolean;
  /** Ink colour of the tick. */
  color?: Color;
  size?: Size;
  /** Selectable card: the whole sheet is the hit area. */
  card?: boolean;
  /** Card only: extra detail on the far side (price, seats…). */
  aside?: ReactNode;
  invalid?: boolean;
  /** Class for the `<input>`; `className` goes on the wrapper. */
  inputClassName?: string;
}

/**
 * Native checkbox. `ref`, `checked`/`defaultChecked`, `onChange` and every
 * other input prop go to the `<input>`; `className` styles the wrapper.
 */
export function Checkbox({
  children,
  hint,
  indeterminate,
  color,
  size = 'md',
  card,
  aside,
  invalid,
  className,
  inputClassName,
  ref,
  id,
  required,
  disabled,
  'aria-describedby': describedBy,
  'aria-invalid': ariaInvalid,
  ...rest
}: CheckboxProps) {
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

  // `indeterminate` is a DOM property, not an attribute — sync it after every
  // render so a click (which clears it natively) can't leave it out of step.
  const inner = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    if (inner.current) inner.current.indeterminate = Boolean(indeterminate);
  });
  const setRef = useMemo(() => mergeRefs(inner, ref), [ref]);

  return (
    <CheckLayout
      base='check'
      className={cx(
        'check',
        color && `check-${color}`,
        size !== 'md' && `check-${size}`,
        card && 'check-card',
        className,
      )}
      inputId={inputId}
      label={children}
      hint={hint}
      hintId={hintId}
      aside={card ? aside : undefined}
      input={
        <input
          {...rest}
          ref={setRef}
          type='checkbox'
          id={inputId}
          required={field.required}
          disabled={field.disabled}
          aria-invalid={field['aria-invalid']}
          aria-describedby={cx(field['aria-describedby'], hintId) || undefined}
          className={cx(
            'check-input',
            field.invalid && 'is-invalid',
            inputClassName,
          )}
        />
      }
    />
  );
}

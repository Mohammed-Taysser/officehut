import { use, useId, type ComponentPropsWithRef, type ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';
import type { Color, Size } from '../../../shared/tokens.js';
import { CheckLayout } from '../Checkbox/CheckLayout.js';
import { RadioGroupContext } from '../RadioGroup/RadioGroup.js';

export interface RadioProps extends Omit<
  ComponentPropsWithRef<'input'>,
  'type' | 'size' | 'value'
> {
  value?: string;
  /** The label. */
  children?: ReactNode;
  hint?: ReactNode;
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
 * Native radio. Inside a `<RadioGroup>` it takes the group's `name`, checked
 * state and change handler; on its own it behaves like the plain element.
 */
export function Radio({
  value,
  children,
  hint,
  color,
  size = 'md',
  card,
  aside,
  invalid,
  className,
  inputClassName,
  id,
  onChange,
  'aria-describedby': describedBy,
  ...rest
}: RadioProps) {
  const group = use(RadioGroupContext);
  const ownId = useId();
  const inputId = id ?? ownId;
  const hintId = hint ? `${inputId}-hint` : undefined;

  const groupProps = group
    ? {
        name: group.name,
        required: rest.required ?? group.required,
        ...(group.value !== undefined
          ? { checked: group.value === value }
          : group.defaultValue !== undefined
            ? { defaultChecked: group.defaultValue === value }
            : {}),
      }
    : {};
  const isInvalid = invalid ?? group?.invalid ?? false;

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
          {...groupProps}
          type='radio'
          id={inputId}
          value={value}
          aria-describedby={cx(describedBy, hintId) || undefined}
          className={cx(
            'check-input',
            isInvalid && 'is-invalid',
            inputClassName,
          )}
          onChange={(e) => {
            onChange?.(e);
            if (e.target.checked && value !== undefined)
              group?.onChange?.(value, e);
          }}
        />
      }
    />
  );
}

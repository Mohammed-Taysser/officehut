import {
  createContext,
  use,
  useId,
  type AriaAttributes,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import { cx } from '../../../shared/cx.js';

interface FieldContextValue {
  id: string;
  describedBy: string | undefined;
  invalid: boolean;
  required: boolean | undefined;
  disabled: boolean | undefined;
}

const FieldContext = createContext<FieldContextValue | null>(null);

/** Props a form control may receive from — or override on — a surrounding `<Field>`. */
export interface FieldControlProps {
  id?: string;
  required?: boolean;
  disabled?: boolean;
  /** Marks the control invalid (`aria-invalid` + `.is-invalid`). Defaults to the Field's state. */
  invalid?: boolean;
  'aria-describedby'?: string;
  'aria-invalid'?: AriaAttributes['aria-invalid'];
}

/**
 * Merge a control's own props with the surrounding `<Field>`: id, described-by
 * (error + hint), invalid, required and disabled. Own props win. Use it to wire
 * a custom control into a Field.
 */
export function useField({
  id,
  required,
  disabled,
  invalid,
  ...aria
}: FieldControlProps) {
  const ctx = use(FieldContext);
  const isInvalid =
    invalid ??
    (ctx?.invalid ||
      aria['aria-invalid'] === true ||
      aria['aria-invalid'] === 'true');
  return {
    id: id ?? ctx?.id,
    required: required ?? ctx?.required,
    disabled: disabled ?? ctx?.disabled,
    invalid: isInvalid,
    'aria-describedby':
      cx(aria['aria-describedby'], ctx?.describedBy) || undefined,
    'aria-invalid': isInvalid || undefined,
  };
}

export interface FieldProps extends Omit<ComponentPropsWithRef<'div'>, 'id'> {
  /** Visible label, linked to the control with `for`. */
  label?: ReactNode;
  /** Help text under the control. Linked with `aria-describedby`. */
  hint?: ReactNode;
  /** A handwritten margin remark (an approver's note, a reminder). Also linked with `aria-describedby`. */
  remark?: ReactNode;
  /** Error message. Marks the control invalid and is read out before the hint. */
  error?: ReactNode;
  /** Passes `required` to the control and prints a red asterisk. */
  required?: boolean;
  /** Prints a quiet "optional" after the label instead. */
  optional?: boolean | string;
  /** Force the invalid state without a message. */
  invalid?: boolean;
  disabled?: boolean;
  /** The control's id. Generated if omitted. */
  id?: string;
  /** Label beside the control from `md` up. */
  horizontal?: boolean;
  children: ReactNode;
}

/**
 * Label + control + hint + error. Any officehut control inside picks up the
 * id, `aria-describedby`, `aria-invalid`, `required` and `disabled` from it.
 */
export function Field({
  label,
  hint,
  remark,
  error,
  required,
  optional,
  invalid,
  disabled,
  id: idProp,
  horizontal,
  className,
  children,
  ...rest
}: FieldProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const hintId = hint ? `${id}-hint` : undefined;
  const remarkId = remark ? `${id}-remark` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const ctx: FieldContextValue = {
    id,
    describedBy: cx(errorId, hintId, remarkId) || undefined,
    invalid: invalid ?? Boolean(error),
    required,
    disabled,
  };

  return (
    <div
      {...rest}
      className={cx('field', horizontal && 'field-horizontal', className)}
    >
      {label && (
        <label className='label' htmlFor={id}>
          {label}
          {required && (
            <span className='label-required' aria-hidden>
              *
            </span>
          )}
          {optional && !required && (
            <span className='label-optional'>
              {optional === true ? 'optional' : optional}
            </span>
          )}
        </label>
      )}
      <FieldContext value={ctx}>{children}</FieldContext>
      {hint && (
        <p className='field-hint' id={hintId}>
          {hint}
        </p>
      )}
      {remark && (
        <p className='field-remark' id={remarkId}>
          {remark}
        </p>
      )}
      {error && (
        <p className='field-error' id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
}

export interface FieldsetProps extends ComponentPropsWithRef<'fieldset'> {
  legend?: ReactNode;
  /** No box — just groups and names the controls. */
  plain?: boolean;
}

/** A named section of a form. Disabling it disables every control inside. */
export function Fieldset({
  legend,
  plain,
  className,
  children,
  ...rest
}: FieldsetProps) {
  return (
    <fieldset
      {...rest}
      className={cx('fieldset', plain && 'fieldset-plain', className)}
    >
      {legend && <legend>{legend}</legend>}
      {children}
    </fieldset>
  );
}

import {
  createContext,
  use,
  useId,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react';
import { cx } from '../../../shared/cx.js';

const GroupName = createContext<string | undefined>(undefined);

export interface AccordionProps extends ComponentPropsWithRef<'div'> {
  /** Only one item open at a time (uses native `<details name>`). */
  exclusive?: boolean;
  /** Group name for exclusive mode; generated if omitted. */
  name?: string;
  /** No outer border — for use inside cards. */
  flush?: boolean;
}

export function Accordion({
  exclusive,
  name,
  flush,
  className,
  children,
  ...rest
}: AccordionProps) {
  const autoName = useId();
  const group = exclusive ? (name ?? `oh-accordion-${autoName}`) : undefined;
  return (
    <GroupName value={group}>
      <div
        {...rest}
        className={cx('accordion', flush && 'accordion-flush', className)}
      >
        {children}
      </div>
    </GroupName>
  );
}

export interface AccordionItemProps extends Omit<
  ComponentPropsWithRef<'details'>,
  'title'
> {
  title: ReactNode;
  /** Initially open (uncontrolled). */
  defaultOpen?: boolean;
}

export function AccordionItem({
  title,
  defaultOpen,
  className,
  children,
  ...rest
}: AccordionItemProps) {
  const name = use(GroupName);
  return (
    <details
      {...rest}
      name={name}
      open={defaultOpen}
      className={cx('accordion-item', className)}
    >
      <summary>{title}</summary>
      <div className='accordion-body'>{children}</div>
    </details>
  );
}

Accordion.Item = AccordionItem;

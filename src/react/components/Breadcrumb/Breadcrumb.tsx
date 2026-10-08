import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  /** Defaults to the last item. */
  current?: boolean;
}

export interface BreadcrumbProps extends Omit<
  ComponentPropsWithRef<'nav'>,
  'children'
> {
  items: BreadcrumbItem[];
  /** `slash` (default), `arrow`, `dot`, or any string. */
  divider?: 'slash' | 'arrow' | 'dot' | (string & {});
  /** Component used for links, e.g. a router Link. Receives `href`. */
  linkAs?: ElementType;
  label?: string;
}

const DIVIDERS: Record<string, string | undefined> = {
  slash: undefined,
  arrow: 'breadcrumb-arrows',
  dot: 'breadcrumb-dots',
};

export function Breadcrumb({
  items,
  divider = 'slash',
  linkAs: Link = 'a',
  label = 'Breadcrumb',
  className,
  style,
  ...rest
}: BreadcrumbProps) {
  const preset = divider in DIVIDERS;
  return (
    <nav aria-label={label} {...rest} className={className}>
      <ol
        className={cx('breadcrumb', preset && DIVIDERS[divider])}
        style={
          preset
            ? style
            : { ...style, ['--divider' as string]: JSON.stringify(divider) }
        }
      >
        {items.map((item, i) => {
          const current = item.current ?? i === items.length - 1;
          return (
            <li
              key={i}
              className='breadcrumb-item'
              aria-current={current ? 'page' : undefined}
            >
              {item.href && !current ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                item.label
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

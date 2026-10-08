import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';
import { cx } from '../../../shared/cx.js';
import type { PolymorphicProps } from '../../utils/types.js';

export interface SidebarProps extends Omit<
  ComponentPropsWithRef<'aside'>,
  'children'
> {
  /** Top row, level with the navbar. Usually a `<Sidebar.Brand>`. */
  brand?: ReactNode;
  /** Pinned to the bottom: the signed-in user, storage, version. */
  footer?: ReactNode;
  /** The scrolling middle — usually a `<Nav>`. */
  children?: ReactNode;
  /** Drawer state below `lg`. Ignored from `lg` up, where it is always shown. */
  open?: boolean;
  /**
   * Called by the close button, the backdrop and Escape. Providing it renders
   * the close button and the backdrop (both only appear below `lg`).
   */
  onClose?: () => void;
  /** Accessible name of the close button. */
  closeLabel?: string;
  /** Always in the flow: no drawer, no pinning. For settings pages and cards. */
  static?: boolean;
}

/**
 * Full-height side panel. Inside `.shell` it is pinned beside the page from
 * `lg` up and turns into a drawer below.
 */
export function Sidebar({
  brand,
  footer,
  children,
  open = false,
  onClose,
  closeLabel = 'Close menu',
  static: isStatic,
  className,
  onKeyDown,
  ...rest
}: SidebarProps) {
  return (
    <>
      <aside
        {...rest}
        className={cx(
          'sidebar',
          isStatic && 'sidebar-static',
          open && 'is-open',
          className,
        )}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.key === 'Escape' && open && onClose) onClose();
        }}
      >
        {(brand || (onClose && !isStatic)) && (
          <div className='sidebar-header'>
            {brand}
            {onClose && !isStatic && (
              <button
                type='button'
                className='btn-close sidebar-close'
                aria-label={closeLabel}
                onClick={onClose}
              />
            )}
          </div>
        )}
        <div className='sidebar-body'>{children}</div>
        {footer && <div className='sidebar-footer'>{footer}</div>}
      </aside>
      {onClose && !isStatic && (
        <div className='sidebar-backdrop' aria-hidden onClick={onClose} />
      )}
    </>
  );
}

export type SidebarBrandProps<E extends ElementType = 'a'> = PolymorphicProps<
  E,
  { className?: string; children?: ReactNode }
>;

export function SidebarBrand<E extends ElementType = 'a'>({
  as,
  className,
  ...rest
}: SidebarBrandProps<E>) {
  const Tag: ElementType = as ?? 'a';
  return <Tag {...rest} className={cx('sidebar-brand', className)} />;
}

Sidebar.Brand = SidebarBrand;

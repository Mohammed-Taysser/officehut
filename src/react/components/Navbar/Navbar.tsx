import {
  useId,
  type ComponentPropsWithRef,
  type ElementType,
  type ReactNode,
} from 'react';
import { cx } from '../../../shared/cx.js';
import { useControllableState } from '../../hooks/useControllableState.js';
import type { PolymorphicProps } from '../../utils/types.js';

export interface NavbarProps extends Omit<
  ComponentPropsWithRef<'header'>,
  'children'
> {
  /** Usually a `<Navbar.Brand>`. */
  brand?: ReactNode;
  /** Before the brand, e.g. a `<Navbar.Toggle>` that opens the sidebar drawer. */
  start?: ReactNode;
  /** Pushed to the end of the bar: search, notifications, user menu. */
  end?: ReactNode;
  /** `<Navbar.Link>`s. They fold behind a menu toggle below `lg`. */
  children?: ReactNode;
  /** Accessible name of the `<nav>` around the links. */
  menuLabel?: string;
  /** Accessible name of the menu toggle. */
  toggleLabel?: string;
  menuOpen?: boolean;
  defaultMenuOpen?: boolean;
  onMenuOpenChange?: (open: boolean) => void;
  /** Stick to the top while the page scrolls (automatic inside `.shell`). */
  sticky?: boolean;
}

/** Top bar: brand, links that fold into a menu on phones, and an end slot. */
export function Navbar({
  brand,
  start,
  end,
  children,
  menuLabel = 'Main',
  toggleLabel = 'Menu',
  menuOpen,
  defaultMenuOpen = false,
  onMenuOpenChange,
  sticky,
  className,
  ...rest
}: NavbarProps) {
  const [open, setOpen] = useControllableState(
    menuOpen,
    defaultMenuOpen,
    onMenuOpenChange,
  );
  const id = useId();
  const hasMenu =
    children !== undefined && children !== null && children !== false;

  return (
    <header
      {...rest}
      className={cx('navbar', sticky && 'navbar-sticky', className)}
    >
      {start}
      {hasMenu && (
        <NavbarToggle
          aria-label={toggleLabel}
          aria-controls={id}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        />
      )}
      {brand}
      {hasMenu && (
        // Not `inert` when closed: from `lg` up the links are always visible.
        // Below `lg` the closed `.collapse` is `visibility: hidden`, which
        // already removes the links from the tab order.
        <div
          id={id}
          className={cx('navbar-collapse collapse', open && 'is-open')}
        >
          <div>
            <nav
              className='navbar-nav'
              aria-label={menuLabel}
              onClick={(e) => {
                if (open && (e.target as Element).closest('a[href]'))
                  setOpen(false);
              }}
            >
              {children}
            </nav>
          </div>
        </div>
      )}
      {end && <div className='navbar-end'>{end}</div>}
    </header>
  );
}

export type NavbarBrandProps<E extends ElementType = 'a'> = PolymorphicProps<
  E,
  { className?: string; children?: ReactNode }
>;

export function NavbarBrand<E extends ElementType = 'a'>({
  as,
  className,
  ...rest
}: NavbarBrandProps<E>) {
  const Tag: ElementType = as ?? 'a';
  return <Tag {...rest} className={cx('navbar-brand', className)} />;
}

export interface NavbarLinkOwnProps {
  /** Current page: sets `aria-current="page"`. */
  active?: boolean;
  className?: string;
  children?: ReactNode;
}

export type NavbarLinkProps<E extends ElementType = 'a'> = PolymorphicProps<
  E,
  NavbarLinkOwnProps
>;

/** A link in the bar. Use `as` for a router link. */
export function NavbarLink<E extends ElementType = 'a'>({
  as,
  active,
  className,
  ...rest
}: NavbarLinkProps<E>) {
  const Tag: ElementType = as ?? 'a';
  return (
    <Tag
      {...rest}
      aria-current={active ? 'page' : undefined}
      className={cx('navbar-link', className)}
    />
  );
}

/** Square toggle that draws a menu / close icon from `aria-expanded`. */
export function NavbarToggle({
  className,
  ...rest
}: ComponentPropsWithRef<'button'>) {
  return (
    <button
      type='button'
      aria-label='Menu'
      {...rest}
      className={cx('navbar-toggle', className)}
    />
  );
}

export function NavbarText({
  className,
  ...rest
}: ComponentPropsWithRef<'span'>) {
  return <span {...rest} className={cx('navbar-text', className)} />;
}

export function NavbarDivider({
  className,
  ...rest
}: ComponentPropsWithRef<'span'>) {
  return (
    <span aria-hidden {...rest} className={cx('navbar-divider', className)} />
  );
}

Navbar.Brand = NavbarBrand;
Navbar.Link = NavbarLink;
Navbar.Toggle = NavbarToggle;
Navbar.Text = NavbarText;
Navbar.Divider = NavbarDivider;

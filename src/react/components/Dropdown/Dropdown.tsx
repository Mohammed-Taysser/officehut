import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../../shared/cx.js';
import {
  computePosition,
  isRtl,
  rectOf,
  scopedTheme,
} from '../../../shared/position.js';
import type { Placement } from '../../../shared/tokens.js';
import { useControllableState } from '../../hooks/useControllableState.js';

const ITEM = '.dropdown-item:not(:disabled):not(.disabled)';

function menuItems(menu: HTMLElement | null): HTMLElement[] {
  return [...(menu?.querySelectorAll<HTMLElement>(ITEM) ?? [])];
}

function focusAt(menu: HTMLElement | null, i: number) {
  const list = menuItems(menu);
  if (list.length)
    list[((i % list.length) + list.length) % list.length]!.focus();
}

export interface DropdownProps {
  /** The element that opens the menu — usually a `<Button>`. */
  trigger: ReactElement<Record<string, unknown>>;
  children: ReactNode;
  placement?: Placement;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Keep the menu open after an item is chosen. */
  keepOpen?: boolean;
  className?: string;
  /** Accessible name of the menu if the trigger text isn't enough. */
  'aria-label'?: string;
}

export function Dropdown({
  trigger,
  children,
  placement = 'bottom-start',
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  keepOpen,
  className,
  'aria-label': ariaLabel,
}: DropdownProps) {
  const [open, setOpen] = useControllableState(
    openProp,
    defaultOpen,
    onOpenChange,
  );
  const [triggerNode, setTriggerNode] = useState<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  // A new object per request so the layout effect re-runs on every key press.
  const [focusReq, setFocusReq] = useState<{ where: 'first' | 'last' } | null>(
    null,
  );
  const id = useId();

  const items = () => menuItems(menuRef.current);
  const focusItem = (i: number) => focusAt(menuRef.current, i);

  const close = useCallback(
    (returnFocus = false) => {
      setOpen(false);
      if (returnFocus) triggerNode?.focus();
    },
    [setOpen, triggerNode],
  );

  const update = useCallback(() => {
    if (!triggerNode || !menuRef.current) return;
    const pos = computePosition(rectOf(triggerNode), rectOf(menuRef.current), {
      placement,
      rtl: isRtl(triggerNode),
    });
    menuRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    menuRef.current.dataset.placement = pos.placement;
  }, [placement, triggerNode]);

  useLayoutEffect(() => {
    if (!open) return;
    update();
    if (focusReq) focusAt(menuRef.current, focusReq.where === 'first' ? 0 : -1);
  }, [open, update, focusReq]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !triggerNode?.contains(t)) close();
    };
    document.addEventListener('pointerdown', onPointer, true);
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      document.removeEventListener('pointerdown', onPointer, true);
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open, close, update, triggerNode]);

  const onMenuKeyDown = (e: ReactKeyboardEvent) => {
    const current = items().indexOf(document.activeElement as HTMLElement);
    const keys: Record<string, () => void> = {
      ArrowDown: () => focusItem(current + 1),
      ArrowUp: () => focusItem(current - 1),
      Home: () => focusItem(0),
      End: () => focusItem(-1),
      Escape: () => close(true),
    };
    if (e.key === 'Tab') close();
    else if (keys[e.key]) {
      e.preventDefault();
      keys[e.key]!();
    }
  };

  if (!isValidElement(trigger))
    throw new Error('[officehut] Dropdown: `trigger` must be an element');
  const triggerProps = trigger.props;

  const triggerEl = cloneElement(trigger, {
    ref: setTriggerNode,
    'aria-haspopup': 'menu',
    'aria-expanded': open,
    'aria-controls': open ? id : undefined,
    onClick: (e: MouseEvent) => {
      (triggerProps.onClick as ((e: MouseEvent) => void) | undefined)?.(e);
      setFocusReq(null);
      setOpen(!open);
    },
    onKeyDown: (e: ReactKeyboardEvent) => {
      (
        triggerProps.onKeyDown as ((e: ReactKeyboardEvent) => void) | undefined
      )?.(e);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusReq({ where: e.key === 'ArrowDown' ? 'first' : 'last' });
        if (!open) setOpen(true);
      }
    },
  });

  return (
    <>
      {triggerEl}
      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={menuRef}
            id={id}
            role='menu'
            aria-label={ariaLabel}
            data-oh-theme={scopedTheme(triggerNode)}
            className={cx('dropdown-menu is-open', className)}
            onKeyDown={onMenuKeyDown}
            onClick={(e) => {
              if (!keepOpen && (e.target as Element).closest(ITEM)) close(true);
            }}
          >
            {children}
          </div>,
          document.body,
        )}
    </>
  );
}

export interface DropdownItemProps extends ComponentPropsWithRef<'button'> {
  icon?: ReactNode;
  /** Keyboard hint shown at the end, e.g. "⌘E". */
  shortcut?: string;
  /** Destructive action styling. */
  danger?: boolean;
  active?: boolean;
  /** Render as a link. */
  href?: string;
}

export function DropdownItem({
  icon,
  shortcut,
  danger,
  active,
  href,
  className,
  children,
  ...rest
}: DropdownItemProps) {
  const classes = cx(
    'dropdown-item',
    danger && 'is-danger',
    active && 'active',
    className,
  );
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {shortcut && <kbd className='dropdown-shortcut'>{shortcut}</kbd>}
    </>
  );
  if (href) {
    return (
      <a
        {...(rest as ComponentPropsWithRef<'a'>)}
        href={href}
        role='menuitem'
        tabIndex={-1}
        className={classes}
        aria-current={active || undefined}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      type='button'
      role='menuitem'
      tabIndex={-1}
      {...rest}
      className={classes}
      aria-current={active || undefined}
    >
      {content}
    </button>
  );
}

export function DropdownHeader({
  className,
  ...rest
}: ComponentPropsWithRef<'span'>) {
  return (
    <span
      role='presentation'
      {...rest}
      className={cx('dropdown-header', className)}
    />
  );
}

export function DropdownDivider({
  className,
  ...rest
}: ComponentPropsWithRef<'hr'>) {
  return (
    <hr
      role='separator'
      {...rest}
      className={cx('dropdown-divider', className)}
    />
  );
}

Dropdown.Item = DropdownItem;
Dropdown.Header = DropdownHeader;
Dropdown.Divider = DropdownDivider;

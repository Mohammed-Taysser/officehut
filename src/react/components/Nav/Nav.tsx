import {
  useId,
  type ComponentPropsWithRef,
  type ElementType,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { cx } from '../../../shared/cx.js';
import { useControllableState } from '../../hooks/useControllableState.js';
import { Collapse } from '../Collapse/Collapse.js';

export interface NavLinkItem {
  label: ReactNode;
  href?: string;
  icon?: ReactNode;
  /** Trailing count or badge, e.g. `12`. */
  badge?: ReactNode;
  /** Force the current state. Otherwise it is `href === currentHref`. */
  current?: boolean;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  /** Child links make this item a collapsible group. */
  items?: NavLinkItem[];
  /**
   * Stable key. For groups it is also the value kept in `openGroups`.
   * Defaults to `href`, then the label when it is a string.
   */
  id?: string;
}

/** A handwritten chapter title between groups of links. */
export interface NavHeading {
  heading: ReactNode;
  id?: string;
}

export type NavEntry = NavLinkItem | NavHeading;

export interface NavProps extends Omit<
  ComponentPropsWithRef<'nav'>,
  'children'
> {
  items: NavEntry[];
  /** Marks the item whose `href` matches as the current page. */
  currentHref?: string;
  /** Component used for links, e.g. a router Link. Receives `href`. */
  linkAs?: ElementType;
  /** Ids of open groups (controlled). */
  openGroups?: string[];
  /** Defaults to the groups that contain the current page. */
  defaultOpenGroups?: string[];
  onOpenGroupsChange?: (ids: string[]) => void;
  /** Accessible name of the `<nav>`. */
  label?: string;
}

const isHeading = (e: NavEntry): e is NavHeading => 'heading' in e;

function keyOf(item: NavLinkItem, path: string): string {
  return (
    item.id ?? item.href ?? (typeof item.label === 'string' ? item.label : path)
  );
}

function isCurrent(item: NavLinkItem, currentHref?: string): boolean {
  return (
    item.current ??
    (currentHref !== undefined &&
      item.href !== undefined &&
      item.href === currentHref)
  );
}

function containsCurrent(item: NavLinkItem, currentHref?: string): boolean {
  return (item.items ?? []).some(
    (c) => isCurrent(c, currentHref) || containsCurrent(c, currentHref),
  );
}

function groupsWithCurrent(
  entries: NavEntry[],
  currentHref: string | undefined,
  path = '',
): string[] {
  const out: string[] = [];
  entries.forEach((e, i) => {
    if (isHeading(e) || !e.items) return;
    const p = `${path}${i}`;
    if (containsCurrent(e, currentHref)) out.push(keyOf(e, p));
    out.push(...groupsWithCurrent(e.items, currentHref, `${p}.`));
  });
  return out;
}

/**
 * Vertical navigation list with section headings and collapsible groups.
 * Built for `<Sidebar>`, but works in any column.
 */
export function Nav({
  items,
  currentHref,
  linkAs = 'a',
  openGroups,
  defaultOpenGroups,
  onOpenGroupsChange,
  label = 'Main',
  className,
  ...rest
}: NavProps) {
  const [open, setOpen] = useControllableState(
    openGroups,
    defaultOpenGroups ?? groupsWithCurrent(items, currentHref),
    onOpenGroupsChange,
  );
  const baseId = useId();
  const Link = linkAs;

  const toggle = (key: string) =>
    setOpen(
      open.includes(key) ? open.filter((k) => k !== key) : [...open, key],
    );

  const content = (item: NavLinkItem) => (
    <>
      {item.icon && (
        <span className='nav-icon' aria-hidden>
          {item.icon}
        </span>
      )}
      <span className='nav-text'>{item.label}</span>
      {item.badge !== undefined && item.badge !== null && (
        <span className='nav-badge'>{item.badge}</span>
      )}
    </>
  );

  const renderList = (entries: NavEntry[], path: string): ReactNode =>
    entries.map((entry, i) => {
      const p = `${path}${i}`;
      if (isHeading(entry)) {
        return (
          <li key={entry.id ?? `h${p}`} className='nav-label'>
            {entry.heading}
          </li>
        );
      }
      const key = keyOf(entry, p);

      if (entry.items) {
        const isOpen = open.includes(key);
        const regionId = `${baseId}-g${p}`;
        return (
          <li key={key} className='nav-item nav-group'>
            <button
              type='button'
              className={cx(
                'nav-link nav-toggle',
                containsCurrent(entry, currentHref) && 'has-current',
              )}
              aria-expanded={isOpen}
              aria-controls={regionId}
              disabled={entry.disabled}
              onClick={(e) => {
                entry.onClick?.(e);
                toggle(key);
              }}
            >
              {content(entry)}
            </button>
            <Collapse id={regionId} open={isOpen}>
              <ul className='nav-list'>{renderList(entry.items, `${p}.`)}</ul>
            </Collapse>
          </li>
        );
      }

      const current = isCurrent(entry, currentHref);
      let link: ReactNode;
      if (entry.href && !entry.disabled) {
        link = (
          <Link
            href={entry.href}
            className='nav-link'
            aria-current={current ? 'page' : undefined}
            onClick={entry.onClick}
          >
            {content(entry)}
          </Link>
        );
      } else if (entry.href) {
        link = (
          <a role='link' className='nav-link' aria-disabled='true'>
            {content(entry)}
          </a>
        );
      } else {
        link = (
          <button
            type='button'
            className='nav-link'
            aria-current={current ? 'page' : undefined}
            disabled={entry.disabled}
            onClick={entry.onClick}
          >
            {content(entry)}
          </button>
        );
      }
      return (
        <li key={key} className='nav-item'>
          {link}
        </li>
      );
    });

  return (
    <nav aria-label={label} {...rest} className={className}>
      <ul className='nav-list'>{renderList(items, '')}</ul>
    </nav>
  );
}

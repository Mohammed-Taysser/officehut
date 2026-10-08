import {
  createContext,
  use,
  useId,
  useRef,
  type ComponentPropsWithRef,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cx } from '../../../shared/cx.js';
import { useControllableState } from '../../hooks/useControllableState.js';

interface TabsContextValue {
  value: string;
  select: (v: string) => void;
  id: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs(part: string) {
  const ctx = use(TabsContext);
  if (!ctx) throw new Error(`[officehut] <Tabs.${part}> must be inside <Tabs>`);
  return ctx;
}

export interface TabsProps {
  value?: string;
  defaultValue: string;
  onChange?: (value: string) => void;
  children: ReactNode;
}

export function Tabs({ value, defaultValue, onChange, children }: TabsProps) {
  const [current, select] = useControllableState(value, defaultValue, onChange);
  const id = useId();
  return (
    <TabsContext value={{ value: current, select, id }}>{children}</TabsContext>
  );
}

export interface TabListProps extends ComponentPropsWithRef<'div'> {
  /** `underline` (default), `folder` (manila tabs), `segmented`, or `index` (binder dividers — wrap in `.binder`). */
  variant?: 'underline' | 'folder' | 'segmented' | 'index';
  /** Stretch tabs to fill the row. */
  fill?: boolean;
}

export function TabList({
  variant = 'underline',
  fill,
  className,
  onKeyDown,
  ...rest
}: TabListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { select } = useTabs('List');

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    const tabs = [
      ...(ref.current?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not(:disabled)',
      ) ?? []),
    ];
    const i = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    const rtl = getComputedStyle(e.currentTarget).direction === 'rtl';
    const vertical = variant === 'index';
    const map: Record<string, number> = {
      [vertical ? 'ArrowDown' : rtl ? 'ArrowLeft' : 'ArrowRight']: i + 1,
      [vertical ? 'ArrowUp' : rtl ? 'ArrowRight' : 'ArrowLeft']: i - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    if (!(e.key in map)) return;
    e.preventDefault();
    const next = tabs[(map[e.key]! + tabs.length) % tabs.length]!;
    next.focus();
    select(next.dataset.value!);
  };

  return (
    <div
      ref={ref}
      role='tablist'
      aria-orientation={variant === 'index' ? 'vertical' : undefined}
      {...rest}
      onKeyDown={handleKey}
      className={cx(
        'tabs',
        variant !== 'underline' && `tabs-${variant}`,
        fill && 'tabs-fill',
        className,
      )}
    />
  );
}

export interface TabProps extends ComponentPropsWithRef<'button'> {
  value: string;
}

export function Tab({ value, className, onClick, ...rest }: TabProps) {
  const ctx = useTabs('Tab');
  const selected = ctx.value === value;
  return (
    <button
      type='button'
      role='tab'
      id={`${ctx.id}-tab-${value}`}
      aria-controls={`${ctx.id}-panel-${value}`}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      data-value={value}
      {...rest}
      className={cx('tab', className)}
      onClick={(e) => {
        onClick?.(e);
        ctx.select(value);
      }}
    />
  );
}

export interface TabPanelProps extends ComponentPropsWithRef<'div'> {
  value: string;
  /** Keep the panel mounted while hidden (preserves state). */
  keepMounted?: boolean;
}

export function TabPanel({
  value,
  keepMounted,
  className,
  children,
  ...rest
}: TabPanelProps) {
  const ctx = useTabs('Panel');
  const selected = ctx.value === value;
  if (!selected && !keepMounted) return null;
  return (
    <div
      role='tabpanel'
      id={`${ctx.id}-panel-${value}`}
      aria-labelledby={`${ctx.id}-tab-${value}`}
      tabIndex={0}
      hidden={!selected}
      {...rest}
      className={cx('tab-panel', className)}
    >
      {children}
    </div>
  );
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

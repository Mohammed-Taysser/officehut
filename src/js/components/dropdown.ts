import { Component, getInstance } from '../core/component.js';
import {
  computePosition,
  isRtl,
  rectOf,
  scopedTheme,
} from '../../shared/position.js';
import type { Placement } from '../../shared/tokens.js';

export interface DropdownOptions {
  placement: Placement;
  offset: number;
  /** Close when an item is clicked. */
  autoClose: boolean;
}

const ITEM = '.dropdown-item:not(:disabled):not(.disabled)';
let openDropdown: Dropdown | null = null;

/**
 * Dropdown bound to its trigger. The menu is the trigger's next
 * `.dropdown-menu` sibling, or `data-oh-target`.
 *
 *   <div class="dropdown">
 *     <button class="btn dropdown-toggle" data-oh-toggle="dropdown">Export</button>
 *     <div class="dropdown-menu">…<button class="dropdown-item">CSV</button></div>
 *   </div>
 */
export class Dropdown extends Component<DropdownOptions> {
  static override readonly NAME = 'dropdown';
  readonly menu: HTMLElement;
  private cleanup: (() => void) | null = null;

  constructor(trigger: HTMLElement, options: Partial<DropdownOptions> = {}) {
    super(
      trigger,
      { placement: 'bottom-start', offset: 6, autoClose: true },
      options,
    );
    const explicit = trigger.getAttribute('data-oh-target');
    const menu =
      (explicit ? document.querySelector<HTMLElement>(explicit) : null) ??
      trigger.parentElement?.querySelector<HTMLElement>(
        ':scope > .dropdown-menu',
      );
    if (!menu)
      throw new Error(
        '[officehut] Dropdown: no .dropdown-menu found for trigger',
      );
    this.menu = menu;
    trigger.setAttribute('aria-haspopup', 'menu');
    trigger.setAttribute('aria-expanded', 'false');
    if (!menu.hasAttribute('role')) menu.setAttribute('role', 'menu');
    trigger.addEventListener('keydown', this.onTriggerKeydown);
  }

  get isOpen(): boolean {
    return this.menu.classList.contains('is-open');
  }

  show(focus: 'first' | 'last' | null = null): void {
    if (this.isOpen || !this.emit('show')) return;
    openDropdown?.hide();
    // eslint-disable-next-line @typescript-eslint/no-this-alias -- module-level "which menu is open" pointer
    openDropdown = this;
    const theme = scopedTheme(this.el);
    if (
      theme &&
      this.menu.closest('[data-oh-theme]') !==
        this.el.closest('[data-oh-theme]')
    ) {
      this.menu.setAttribute('data-oh-theme', theme);
    }
    this.menu.classList.add('is-open');
    this.el.setAttribute('aria-expanded', 'true');
    this.update();

    const onDocPointer = (e: Event) => {
      const t = e.target as Node;
      if (!this.menu.contains(t) && !this.el.contains(t)) this.hide();
    };
    const onScroll = () => this.update();
    document.addEventListener('pointerdown', onDocPointer, true);
    window.addEventListener('resize', onScroll);
    window.addEventListener('scroll', onScroll, true);
    this.menu.addEventListener('keydown', this.onMenuKeydown);
    this.menu.addEventListener('click', this.onMenuClick);
    this.cleanup = () => {
      document.removeEventListener('pointerdown', onDocPointer, true);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('scroll', onScroll, true);
      this.menu.removeEventListener('keydown', this.onMenuKeydown);
      this.menu.removeEventListener('click', this.onMenuClick);
    };

    if (focus) this.focusItem(focus === 'first' ? 0 : -1);
    this.emit('shown', undefined, false);
  }

  hide(returnFocus = false): void {
    if (!this.isOpen || !this.emit('hide')) return;
    this.menu.classList.remove('is-open');
    this.el.setAttribute('aria-expanded', 'false');
    this.cleanup?.();
    this.cleanup = null;
    if (openDropdown === this) openDropdown = null;
    if (returnFocus) this.el.focus();
    this.emit('hidden', undefined, false);
  }

  toggle(): void {
    if (this.isOpen) this.hide();
    else this.show();
  }

  /** Recompute the menu position (called on scroll / resize). */
  update(): void {
    const { x, y, placement } = computePosition(
      rectOf(this.el),
      rectOf(this.menu),
      {
        placement: this.options.placement,
        offset: this.options.offset,
        rtl: isRtl(this.el),
      },
    );
    this.menu.style.transform = `translate(${x}px, ${y}px)`;
    this.menu.dataset.placement = placement;
  }

  override destroy(): void {
    this.hide();
    this.el.removeEventListener('keydown', this.onTriggerKeydown);
    super.destroy();
  }

  private items(): HTMLElement[] {
    return [...this.menu.querySelectorAll<HTMLElement>(ITEM)];
  }

  private focusItem(index: number) {
    const items = this.items();
    if (items.length === 0) return;
    const i = ((index % items.length) + items.length) % items.length;
    items[i]!.focus();
  }

  /** Trigger keyboard handling (ArrowDown / ArrowUp open the menu). */
  onTriggerKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.show('first');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.show('last');
    }
  };

  private onMenuKeydown = (e: KeyboardEvent) => {
    const items = this.items();
    const current = items.indexOf(document.activeElement as HTMLElement);
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.focusItem(current + 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.focusItem(current - 1);
        break;
      case 'Home':
        e.preventDefault();
        this.focusItem(0);
        break;
      case 'End':
        e.preventDefault();
        this.focusItem(-1);
        break;
      case 'Escape':
        e.preventDefault();
        this.hide(true);
        break;
      case 'Tab':
        this.hide();
        break;
    }
  };

  private onMenuClick = (e: MouseEvent) => {
    const item = (e.target as Element).closest(ITEM);
    if (item && this.options.autoClose) this.hide(true);
  };
}

/** Close whichever dropdown is open (e.g. on route change). */
export function closeDropdowns(): void {
  openDropdown?.hide();
}

export { getInstance as getDropdown };

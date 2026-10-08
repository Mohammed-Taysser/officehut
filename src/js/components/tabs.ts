import { Component, getOrCreate } from '../core/component.js';

/**
 * WAI-ARIA tabs. Markup:
 *   <div class="tabs" role="tablist">
 *     <button class="tab" role="tab" aria-controls="p1" aria-selected="true">…
 *   </div>
 *   <div class="tab-panel" role="tabpanel" id="p1">…
 *
 * Arrow keys move between tabs (automatic activation), Home/End jump.
 */
export class Tabs extends Component {
  static override readonly NAME = 'tabs';

  constructor(list: HTMLElement) {
    super(list, {});
    if (!list.hasAttribute('role')) list.setAttribute('role', 'tablist');
    if (
      list.classList.contains('tabs-index') &&
      !list.hasAttribute('aria-orientation')
    ) {
      list.setAttribute('aria-orientation', 'vertical');
    }
    const tabs = this.tabs();
    const selected =
      tabs.find((t) => t.getAttribute('aria-selected') === 'true') ?? tabs[0];
    for (const tab of tabs) {
      tab.setAttribute('role', 'tab');
      this.sync(tab, tab === selected);
    }
    list.addEventListener('keydown', this.onKeydown);
  }

  tabs(): HTMLElement[] {
    return [
      ...this.el.querySelectorAll<HTMLElement>(
        ':scope > [role="tab"], :scope > .tab',
      ),
    ];
  }

  select(tab: HTMLElement): void {
    const tabs = this.tabs();
    if (!tabs.includes(tab) || tab.getAttribute('aria-selected') === 'true')
      return;
    if (!this.emit('change', { tab })) return;
    for (const t of tabs) this.sync(t, t === tab);
  }

  override destroy(): void {
    this.el.removeEventListener('keydown', this.onKeydown);
    super.destroy();
  }

  private sync(tab: HTMLElement, on: boolean) {
    tab.setAttribute('aria-selected', String(on));
    tab.tabIndex = on ? 0 : -1;
    const id = tab.getAttribute('aria-controls');
    const panel = id ? document.getElementById(id) : null;
    if (panel) {
      panel.hidden = !on;
      if (!panel.hasAttribute('role')) panel.setAttribute('role', 'tabpanel');
      if (tab.id) panel.setAttribute('aria-labelledby', tab.id);
    }
  }

  /** Arrow / Home / End handling. Public so the data API can forward the first key press. */
  onKeydown = (e: KeyboardEvent): void => {
    const tabs = this.tabs().filter((t) => !(t as HTMLButtonElement).disabled);
    const i = tabs.indexOf(document.activeElement as HTMLElement);
    if (i < 0) return;
    const rtl = getComputedStyle(this.el).direction === 'rtl';
    const vertical =
      this.el.getAttribute('aria-orientation') === 'vertical' ||
      this.el.classList.contains('tabs-index');
    const forward = vertical ? 'ArrowDown' : rtl ? 'ArrowLeft' : 'ArrowRight';
    const back = vertical ? 'ArrowUp' : rtl ? 'ArrowRight' : 'ArrowLeft';
    let next: number | null = null;
    if (e.key === forward) next = i + 1;
    else if (e.key === back) next = i - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    if (next === null) return;
    e.preventDefault();
    const tab = tabs[(next + tabs.length) % tabs.length]!;
    tab.focus();
    this.select(tab);
  };
}

export function handleTabClick(tab: HTMLElement): void {
  const list = tab.closest<HTMLElement>('[role="tablist"], .tabs');
  if (list) getOrCreate(Tabs, list).select(tab);
}

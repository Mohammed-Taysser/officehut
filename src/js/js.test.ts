import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { initAll } from './core/data-api.js';
import { getInstance } from './core/component.js';
import { Collapse } from './components/collapse.js';
import { Dropdown } from './components/dropdown.js';
import { Modal } from './components/modal.js';
import { Tabs } from './components/tabs.js';
import { toast } from './components/toast.js';
import {
  getTheme,
  restoreTheme,
  setTheme,
  toggleTheme,
} from './components/theme.js';

const click = (el: Element) =>
  el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
const key = (el: Element, k: string) =>
  el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));

let teardown: () => void;
beforeEach(() => {
  teardown = initAll();
});
afterEach(() => teardown());

describe('initAll', () => {
  it('is idempotent', () => {
    expect(initAll()).toBe(teardown);
  });
});

describe('collapse', () => {
  it('toggles via data API and syncs aria-expanded', () => {
    document.body.innerHTML = `
			<button data-oh-toggle="collapse" data-oh-target="#c" aria-expanded="false">Filters</button>
			<div class="collapse" id="c"><div>content</div></div>`;
    const btn = document.querySelector('button')!;
    const panel = document.getElementById('c')!;
    click(btn);
    expect(panel).toHaveClass('is-open');
    expect(btn).toHaveAttribute('aria-expanded', 'true');
    click(btn);
    expect(panel).not.toHaveClass('is-open');
  });

  it('closes siblings inside a parent and can be cancelled', () => {
    document.body.innerHTML = `
			<div id="acc">
				<div class="collapse is-open" id="a" data-oh-parent="#acc"><div>A</div></div>
				<div class="collapse" id="b" data-oh-parent="#acc"><div>B</div></div>
			</div>`;
    const b = new Collapse(document.getElementById('b')!);
    b.show();
    expect(document.getElementById('a')).not.toHaveClass('is-open');

    document
      .getElementById('b')!
      .addEventListener('oh:hide', (e) => e.preventDefault());
    b.hide();
    expect(b.isOpen).toBe(true);
  });
});

describe('dropdown', () => {
  beforeEach(() => {
    document.body.innerHTML = `
			<div class="dropdown">
				<button class="btn" data-oh-toggle="dropdown">Export</button>
				<div class="dropdown-menu">
					<button class="dropdown-item">CSV</button>
					<button class="dropdown-item" disabled>PDF</button>
					<button class="dropdown-item">XLSX</button>
				</div>
			</div>
			<p id="outside">elsewhere</p>`;
  });

  it('opens on click, sets aria, closes on outside pointer', () => {
    const btn = document.querySelector<HTMLElement>('[data-oh-toggle]')!;
    click(btn);
    const menu = document.querySelector('.dropdown-menu')!;
    expect(menu).toHaveClass('is-open');
    expect(btn).toHaveAttribute('aria-expanded', 'true');
    document
      .getElementById('outside')!
      .dispatchEvent(new Event('pointerdown', { bubbles: true }));
    expect(menu).not.toHaveClass('is-open');
  });

  it('keyboard: ArrowDown opens and focuses, skips disabled, Esc returns focus', () => {
    const btn = document.querySelector<HTMLElement>('[data-oh-toggle]')!;
    const dd = new Dropdown(btn);
    key(btn, 'ArrowDown');
    const items = document.querySelectorAll<HTMLElement>('.dropdown-item');
    expect(document.activeElement).toBe(items[0]);
    key(dd.menu, 'ArrowDown');
    expect(document.activeElement).toBe(items[2]);
    key(dd.menu, 'Escape');
    expect(dd.isOpen).toBe(false);
    expect(document.activeElement).toBe(btn);
  });

  it('closes after an item is chosen', () => {
    const btn = document.querySelector<HTMLElement>('[data-oh-toggle]')!;
    click(btn);
    click(document.querySelector('.dropdown-item')!);
    expect(getInstance(Dropdown, btn)!.isOpen).toBe(false);
  });
});

describe('modal', () => {
  it('opens from a trigger and closes from a dismiss button', () => {
    vi.useFakeTimers();
    document.body.innerHTML = `
			<button data-oh-toggle="modal" data-oh-target="#m">Open</button>
			<dialog class="modal" id="m"><button data-oh-dismiss="modal">x</button></dialog>`;
    const dialog = document.querySelector('dialog')!;
    click(document.querySelector('[data-oh-toggle]')!);
    expect(dialog.open).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');

    const modal = getInstance(Modal, dialog)!;
    modal.hide();
    vi.runAllTimers();
    expect(dialog.open).toBe(false);
    expect(document.body.style.overflow).toBe('');
    vi.useRealTimers();
  });

  it('rejects non-dialog elements', () => {
    expect(() => new Modal(document.createElement('div'))).toThrow(/dialog/);
  });
});

describe('tabs', () => {
  it('selects on click and with arrow keys', () => {
    document.body.innerHTML = `
			<div class="tabs" role="tablist">
				<button class="tab" data-oh-toggle="tab" aria-controls="p1" aria-selected="true">One</button>
				<button class="tab" data-oh-toggle="tab" aria-controls="p2">Two</button>
			</div>
			<div id="p1">1</div><div id="p2">2</div>`;
    const [one, two] = document.querySelectorAll<HTMLElement>('.tab');
    click(two!);
    expect(two).toHaveAttribute('aria-selected', 'true');
    expect(document.getElementById('p1')!.hidden).toBe(true);
    expect(document.getElementById('p2')!.hidden).toBe(false);

    const tabs = getInstance(Tabs, document.querySelector('.tabs'))!;
    two!.focus();
    key(tabs.el, 'ArrowRight');
    expect(one).toHaveAttribute('aria-selected', 'true');
    expect(one!.tabIndex).toBe(0);
  });
});

describe('elements added after initAll', () => {
  it('dropdown opens with ArrowDown before any click', () => {
    document.body.innerHTML = `
			<div class="dropdown">
				<button class="btn" data-oh-toggle="dropdown">Export</button>
				<div class="dropdown-menu"><button class="dropdown-item">CSV</button></div>
			</div>`;
    const btn = document.querySelector<HTMLElement>('[data-oh-toggle]')!;
    btn.focus();
    key(btn, 'ArrowDown');
    expect(document.querySelector('.dropdown-menu')).toHaveClass('is-open');
    expect(document.activeElement).toHaveTextContent('CSV');
  });

  it('tabs respond to arrow keys before any click', () => {
    document.body.innerHTML = `
			<div class="tabs" role="tablist">
				<button class="tab" role="tab" aria-controls="a" aria-selected="true">A</button>
				<button class="tab" role="tab" aria-controls="b">B</button>
			</div>
			<div id="a">a</div><div id="b" hidden>b</div>`;
    const [a, b] = document.querySelectorAll<HTMLElement>('.tab');
    a!.focus();
    key(a!, 'ArrowRight');
    expect(b).toHaveAttribute('aria-selected', 'true');
    expect(document.getElementById('b')!.hidden).toBe(false);
  });

  it('data-oh-dismiss="modal" closes through Modal (events fire)', () => {
    vi.useFakeTimers();
    document.body.innerHTML = `<dialog class="modal" id="m"><button data-oh-dismiss="modal">x</button></dialog>`;
    const dialog = document.querySelector('dialog')!;
    const onHide = vi.fn();
    dialog.addEventListener('oh:hide', onHide);
    new Modal(dialog).show();
    click(dialog.querySelector('button')!);
    expect(onHide).toHaveBeenCalled();
    vi.runAllTimers();
    expect(dialog.open).toBe(false);
    vi.useRealTimers();
  });
});

describe('dismiss', () => {
  it('removes the closest alert and can be prevented', () => {
    document.body.innerHTML = `<div class="alert"><button data-oh-dismiss>x</button></div>`;
    const alert = document.querySelector('.alert')!;
    alert.addEventListener('oh:dismiss', (e) => e.preventDefault(), {
      once: true,
    });
    click(document.querySelector('button')!);
    expect(alert.isConnected).toBe(true);
    click(document.querySelector('button')!);
    expect(alert.isConnected).toBe(false);
  });
});

describe('toast', () => {
  it('renders into a stack with role and auto-dismisses', () => {
    vi.useFakeTimers();
    toast({
      title: 'Invoice sent',
      message: 'INV-2041',
      color: 'success',
      duration: 1000,
    });
    const el = document.querySelector('.toast')!;
    expect(el).toHaveClass('toast-success');
    expect(el).toHaveAttribute('role', 'status');
    expect(el.closest('.toast-stack')).not.toBeNull();
    vi.advanceTimersByTime(1100);
    expect(el.isConnected).toBe(false);
    vi.useRealTimers();
  });

  it('uses role=alert for danger', () => {
    toast({ message: 'Payment failed', color: 'danger', duration: 0 });
    expect(document.querySelector('.toast')).toHaveAttribute('role', 'alert');
  });
});

describe('theme', () => {
  it('sets, toggles, persists and restores', () => {
    setTheme('dark');
    expect(getTheme()).toBe('dark');
    expect(localStorage.getItem('oh-theme')).toBe('dark');
    expect(toggleTheme()).toBe('light');
    document.documentElement.removeAttribute('data-oh-theme');
    expect(restoreTheme()).toBe('light');
  });

  it('handles data-oh-toggle="theme" with an explicit value', () => {
    document.body.innerHTML = `<button data-oh-toggle="theme" data-oh-value="auto">Auto</button>`;
    click(document.querySelector('button')!);
    expect(getTheme()).toBe('auto');
  });

  it('scopes to a subtree without persisting', () => {
    const div = document.createElement('div');
    setTheme('dark', { root: div });
    expect(div.getAttribute('data-oh-theme')).toBe('dark');
    expect(localStorage.getItem('oh-theme')).toBeNull();
  });
});

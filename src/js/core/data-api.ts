import { getInstance, getOrCreate } from './component.js';
import { resolveTarget } from './dom.js';
import { Collapse } from '../components/collapse.js';
import { Dropdown } from '../components/dropdown.js';
import { Modal } from '../components/modal.js';
import { Tabs, handleTabClick } from '../components/tabs.js';
import { handleDismissClick } from '../components/dismiss.js';
import { handleThemeClick } from '../components/theme.js';
import { bindTooltips } from '../components/tooltip.js';

type Handler = (trigger: HTMLElement, event: MouseEvent) => void;

const toggles: Record<string, Handler> = {
  collapse(trigger, event) {
    const target = resolveTarget(trigger);
    if (!target) return;
    if (trigger.tagName === 'A') event.preventDefault();
    getOrCreate(Collapse, target).toggle();
  },
  dropdown(trigger, event) {
    event.preventDefault();
    getOrCreate(Dropdown, trigger).toggle();
  },
  modal(trigger, event) {
    const target = resolveTarget(trigger);
    if (!target) return;
    event.preventDefault();
    getOrCreate(Modal, target).show(trigger);
  },
  tab(trigger, event) {
    if (trigger.tagName === 'A') event.preventDefault();
    handleTabClick(trigger);
  },
  theme(trigger) {
    handleThemeClick(trigger);
  },
};

/** Register a custom `data-oh-toggle="<name>"` handler. */
export function registerToggle(name: string, handler: Handler): void {
  toggles[name] = handler;
}

function onClick(event: MouseEvent) {
  const el = event.target as Element | null;
  if (!el?.closest) return;

  const dismissTrigger = el.closest<HTMLElement>('[data-oh-dismiss]');
  if (dismissTrigger) {
    const dialog =
      dismissTrigger.getAttribute('data-oh-dismiss') === 'modal'
        ? dismissTrigger.closest<HTMLDialogElement>('dialog')
        : null;
    // Close modals through the Modal class: animation + oh:hide/hidden events.
    if (dialog) getOrCreate(Modal, dialog).hide();
    else handleDismissClick(dismissTrigger);
    return;
  }

  const trigger = el.closest<HTMLElement>('[data-oh-toggle]');
  if (
    !trigger ||
    trigger.matches(':disabled, .disabled, [aria-disabled="true"]')
  )
    return;
  toggles[trigger.getAttribute('data-oh-toggle') ?? '']?.(trigger, event);
}

/**
 * Keyboard support for elements that haven't been clicked yet (and may have
 * been added after initAll): create the instance on the first key press and
 * hand it the event.
 */
function onKeydown(event: KeyboardEvent) {
  const el = event.target as Element | null;
  if (!el?.closest) return;

  const ddTrigger = el.closest<HTMLElement>('[data-oh-toggle="dropdown"]');
  if (
    ddTrigger &&
    (event.key === 'ArrowDown' || event.key === 'ArrowUp') &&
    !getInstance(Dropdown, ddTrigger)
  ) {
    getOrCreate(Dropdown, ddTrigger).onTriggerKeydown(event);
    return;
  }

  const tab = el.closest<HTMLElement>('[data-oh-toggle="tab"], [role="tab"]');
  const list = tab?.closest<HTMLElement>('[role="tablist"], .tabs');
  if (list && !getInstance(Tabs, list))
    getOrCreate(Tabs, list).onKeydown(event);
}

let teardown: (() => void) | null = null;

/**
 * Wire up every `data-oh-*` behaviour with a few delegated listeners on
 * `document`. Safe to call more than once; returns a function that unbinds.
 *
 * Elements added later work automatically — no need to re-run.
 */
export function initAll(): () => void {
  if (teardown) return teardown;
  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onKeydown);
  const unbindTips = bindTooltips(document);

  // Tabs need aria/tabindex set up before the first click.
  document
    .querySelectorAll<HTMLElement>(
      '[role="tablist"][data-oh-tabs], .tabs[data-oh-tabs]',
    )
    .forEach((list) => getOrCreate(Tabs, list));

  teardown = () => {
    document.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onKeydown);
    unbindTips();
    teardown = null;
  };
  return teardown;
}

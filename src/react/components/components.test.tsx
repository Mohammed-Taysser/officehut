import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../tests/a11y.js';
import {
  Accordion,
  Alert,
  Avatar,
  AvatarList,
  Badge,
  Breadcrumb,
  Button,
  ButtonList,
  Card,
  Collapse,
  Dropdown,
  Modal,
  Tabs,
  Tooltip,
} from '../index.js';

describe('Button', () => {
  it('builds class names from props (no stray spaces or "undefined")', () => {
    render(
      <Button color='primary' variant='outline' size='sm' pill className='x'>
        Save
      </Button>,
    );
    const btn = screen.getByRole('button', { name: 'Save' });
    expect(btn.className).toBe('btn btn-primary btn-outline btn-sm btn-pill x');
    expect(btn).toHaveAttribute('type', 'button');
  });

  it('neutral by default', () => {
    render(<Button>Cancel</Button>);
    expect(screen.getByRole('button').className).toBe('btn');
  });

  it('renders <a> with href and keeps icon + label', () => {
    render(
      <Button href='/invoices' icon={<svg data-testid='i' />}>
        Invoices
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Invoices' });
    expect(link).toHaveAttribute('href', '/invoices');
    expect(screen.getByTestId('i')).toBeInTheDocument();
  });

  it('loading disables and marks busy', async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Pay
      </Button>,
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(btn).toHaveClass('is-loading');
  });

  it('forwards refs (React 19 ref prop)', () => {
    let node: HTMLButtonElement | null = null;
    render(
      <Button ref={(n: HTMLButtonElement | null) => void (node = n)}>R</Button>,
    );
    expect(node).toBeInstanceOf(HTMLButtonElement);
  });

  it('ButtonList attached renders a group', () => {
    render(
      <ButtonList attached aria-label='View'>
        <Button>Day</Button>
        <Button>Week</Button>
      </ButtonList>,
    );
    expect(screen.getByRole('group', { name: 'View' })).toHaveClass(
      'btn-group',
    );
  });
});

describe('Badge', () => {
  it('is a span, soft by default, supports stamp', () => {
    const { container } = render(
      <>
        <Badge color='success'>Paid</Badge>
        <Badge color='danger' variant='stamp' animate>
          Overdue
        </Badge>
      </>,
    );
    const [paid, overdue] = container.querySelectorAll('span');
    expect(paid!.className).toBe('badge badge-success badge-soft');
    expect(overdue!.className).toBe(
      'badge badge-danger badge-stamp is-animated',
    );
  });
});

describe('Alert', () => {
  it('picks role, icon and dismisses itself', async () => {
    const user = userEvent.setup();
    render(
      <Alert color='warning' title='Heads up' icon dismissible>
        Timesheets close Friday.
      </Alert>,
    );
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('alert', 'alert-warning');
    expect(alert.querySelector('.alert-icon svg')).not.toBeNull();
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('calls onDismiss instead when provided', async () => {
    const onDismiss = vi.fn();
    render(
      <Alert dismissible onDismiss={onDismiss}>
        Note
      </Alert>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledOnce();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Alert color='success' variant='note' title='Saved' icon dismissible>
        Your leave request was sent to Mona.
      </Alert>,
    );
    await expectNoA11yViolations(container);
  });
});

describe('Avatar', () => {
  it('shows initials with a stable colour and accessible name', () => {
    render(<Avatar name='Nadia El-Sayed' presence='online' />);
    const avatar = screen.getByRole('img', { name: 'Nadia El-Sayed' });
    expect(avatar).toHaveTextContent('NE');
    expect(avatar.className).toMatch(
      /avatar-(primary|success|info|warning|danger|aurora)/,
    );
    expect(avatar.querySelector('.avatar-presence.is-online')).not.toBeNull();
  });

  it('AvatarList truncates with +N', () => {
    render(
      <AvatarList stacked max={2}>
        <Avatar name='A B' />
        <Avatar name='C D' />
        <Avatar name='E F' />
        <Avatar name='G H' />
      </AvatarList>,
    );
    expect(screen.getByLabelText('2 more')).toHaveTextContent('+2');
  });
});

describe('Card', () => {
  it('only renders a status edge when asked, no "undefined" classes', () => {
    const { container } = render(<Card>Plain</Card>);
    expect(container.innerHTML).not.toMatch(/undefined|card-status/);
  });

  it('shorthand props build header/body/footer', () => {
    const { container } = render(
      <Card
        title='Q3 invoices'
        subtitle='12 open'
        footer='Updated 2h ago'
        status='danger'
        tab='Finance'
      >
        Body
      </Card>,
    );
    expect(container.querySelector('.card-title')).toHaveTextContent(
      'Q3 invoices',
    );
    expect(
      container.querySelector('.card-status-top.bg-danger'),
    ).not.toBeNull();
    expect(container.querySelector('.card-tab')).toHaveTextContent('Finance');
    expect(container.querySelector('.card-footer')).toHaveTextContent(
      'Updated 2h ago',
    );
  });

  it('compound parts', () => {
    const { container } = render(
      <Card stacked>
        <Card.Header>
          <Card.Title>Meeting rooms</Card.Title>
        </Card.Header>
        <Card.Body>3 free</Card.Body>
      </Card>,
    );
    expect(container.firstElementChild).toHaveClass('card', 'card-stacked');
    expect(container.querySelector('.card-header .card-title')).not.toBeNull();
  });
});

describe('Breadcrumb', () => {
  it('marks the last item current and supports custom dividers', () => {
    render(
      <Breadcrumb
        divider='→'
        items={[
          { label: 'Home', href: '/' },
          { label: 'Invoices', href: '/invoices' },
          { label: 'INV-2041' },
        ]}
      />,
    );
    expect(screen.getByText('INV-2041').closest('li')).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/',
    );
    expect(screen.getByRole('list').style.getPropertyValue('--divider')).toBe(
      '"→"',
    );
  });
});

describe('Collapse & Accordion', () => {
  it('Collapse is inert when closed', () => {
    const { container, rerender } = render(<Collapse open={false}>x</Collapse>);
    expect(container.firstElementChild).toHaveAttribute('inert');
    rerender(<Collapse open>x</Collapse>);
    expect(container.firstElementChild).toHaveClass('is-open');
  });

  it('exclusive accordion shares a details name', () => {
    const { container } = render(
      <Accordion exclusive>
        <Accordion.Item title='How do I submit leave?'>
          Use the form.
        </Accordion.Item>
        <Accordion.Item title='Who approves it?' defaultOpen>
          Your manager.
        </Accordion.Item>
      </Accordion>,
    );
    const details = container.querySelectorAll('details');
    expect(details[0]!.getAttribute('name')).toBeTruthy();
    expect(details[0]!.getAttribute('name')).toBe(
      details[1]!.getAttribute('name'),
    );
    expect(details[1]).toHaveAttribute('open');
  });
});

describe('Dropdown', () => {
  it('opens, navigates with keys, selects and closes', async () => {
    const user = userEvent.setup();
    const onCsv = vi.fn();
    render(
      <Dropdown trigger={<Button>Export</Button>}>
        <Dropdown.Item onClick={onCsv} shortcut='⌘E'>
          CSV
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item danger>Delete</Dropdown.Item>
      </Dropdown>,
    );
    const trigger = screen.getByRole('button', { name: 'Export' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('menuitem', { name: /CSV/ }));
    expect(onCsv).toHaveBeenCalled();
    expect(screen.queryByRole('menu')).toBeNull();
    expect(document.activeElement).toBe(trigger);

    trigger.focus();
    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(screen.getAllByRole('menuitem')[0]);
    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toHaveClass('is-danger');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).toBeNull();
  });
});

describe('Modal', () => {
  function Demo() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Book room</Button>
        <Modal open={open} onClose={() => setOpen(false)} title='Book Room 4B'>
          <p>Thursday, 10:00–11:00</p>
        </Modal>
      </>
    );
  }

  it('opens as a dialog with a labelled title and closes', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Demo />);
    await user.click(screen.getByRole('button', { name: 'Book room' }));
    const dialog = document.querySelector('dialog')!;
    expect(dialog.open).toBe(true);
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(
      screen.getByRole('heading', { name: 'Book Room 4B' }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Close' }));
    vi.runAllTimers();
    expect(dialog.open).toBe(false);
    vi.useRealTimers();
  });
});

describe('Tabs', () => {
  it('connects tabs and panels and supports arrow keys', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Tabs defaultValue='open' onChange={onChange}>
        <Tabs.List variant='folder' aria-label='Invoices'>
          <Tabs.Tab value='open'>Open</Tabs.Tab>
          <Tabs.Tab value='paid'>Paid</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value='open'>12 open</Tabs.Panel>
        <Tabs.Panel value='paid'>30 paid</Tabs.Panel>
      </Tabs>,
    );
    expect(screen.getByRole('tablist')).toHaveClass('tabs', 'tabs-folder');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('12 open');

    await user.click(screen.getByRole('tab', { name: 'Paid' }));
    expect(onChange).toHaveBeenLastCalledWith('paid');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('30 paid');

    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Open' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await expectNoA11yViolations(document.body);
  });
});

describe('Tooltip', () => {
  it('shows on focus, links aria-describedby, hides on Escape', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content='Export as CSV'>
        <Button iconOnly aria-label='Export'>
          ↓
        </Button>
      </Tooltip>,
    );
    await user.tab();
    const tip = await screen.findByRole('tooltip');
    expect(tip).toHaveTextContent('Export as CSV');
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-describedby',
      tip.id,
    );
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).toBeNull();
  });
});

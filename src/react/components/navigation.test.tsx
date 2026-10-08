import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentPropsWithRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../tests/a11y.js';
import { Nav, type NavEntry } from './Nav/index.js';
import { Navbar } from './Navbar/index.js';
import { Pagination, paginationRange } from './Pagination/index.js';
import { Sidebar } from './Sidebar/index.js';
import { Steps } from './Steps/index.js';

describe('paginationRange', () => {
  it('lists every page when they fit', () => {
    expect(paginationRange(1, 1)).toEqual([1]);
    expect(paginationRange(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('returns nothing for zero or negative totals', () => {
    expect(paginationRange(1, 0)).toEqual([]);
    expect(paginationRange(1, -4)).toEqual([]);
  });

  it('puts the gap on the far side near the edges', () => {
    expect(paginationRange(1, 12)).toEqual([1, 2, 3, 4, 5, 'ellipsis', 12]);
    expect(paginationRange(4, 12)).toEqual([1, 2, 3, 4, 5, 'ellipsis', 12]);
    expect(paginationRange(9, 12)).toEqual([1, 'ellipsis', 8, 9, 10, 11, 12]);
    expect(paginationRange(12, 12)).toEqual([1, 'ellipsis', 8, 9, 10, 11, 12]);
  });

  it('uses both gaps in the middle', () => {
    expect(paginationRange(6, 12)).toEqual([
      1,
      'ellipsis',
      5,
      6,
      7,
      'ellipsis',
      12,
    ]);
    expect(paginationRange(10, 20, 2)).toEqual([
      1,
      'ellipsis',
      8,
      9,
      10,
      11,
      12,
      'ellipsis',
      20,
    ]);
  });

  it('never hides a single page behind an ellipsis', () => {
    for (let total = 1; total <= 30; total++) {
      for (let page = 1; page <= total; page++) {
        const r = paginationRange(page, total);
        r.forEach((item, i) => {
          if (item !== 'ellipsis') return;
          const gap = (r[i + 1] as number) - (r[i - 1] as number) - 1;
          expect(gap).toBeGreaterThanOrEqual(2);
        });
        expect(r).toContain(page);
      }
    }
  });

  it('keeps a constant width once paging is needed', () => {
    for (let page = 1; page <= 40; page++)
      expect(paginationRange(page, 40, 1)).toHaveLength(7);
    for (let page = 1; page <= 40; page++)
      expect(paginationRange(page, 40, 2)).toHaveLength(9);
  });

  it('clamps out-of-range pages and handles zero siblings', () => {
    expect(paginationRange(99, 12)).toEqual(paginationRange(12, 12));
    expect(paginationRange(-3, 12)).toEqual(paginationRange(1, 12));
    expect(paginationRange(6, 12, 0)).toEqual([
      1,
      'ellipsis',
      6,
      'ellipsis',
      12,
    ]);
  });
});

describe('Pagination', () => {
  it('marks the current page and moves with prev / next', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination total={12} defaultPage={1} onChange={onChange} />);
    const nav = screen.getByRole('navigation', { name: 'Pagination' });
    expect(screen.getByRole('button', { name: 'Page 1' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(onChange).toHaveBeenLastCalledWith(2);
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute(
      'aria-current',
      'page',
    );

    await user.click(screen.getByRole('button', { name: 'Page 12' }));
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    expect(nav.querySelectorAll('.page-ellipsis')).toHaveLength(1);
  });

  it('renders links with getHref and a custom linkAs', () => {
    const RouterLink = ({ href, ...p }: ComponentPropsWithRef<'a'>) => (
      <a data-router href={href} {...p} />
    );
    render(
      <Pagination
        total={5}
        page={3}
        getHref={(n) => `/invoices?page=${n}`}
        linkAs={RouterLink}
      />,
    );
    const current = screen.getByRole('link', { name: 'Page 3' });
    expect(current).toHaveAttribute('href', '/invoices?page=3');
    expect(current).toHaveAttribute('data-router');
    expect(screen.getByRole('link', { name: 'Next' })).toHaveAttribute(
      'rel',
      'next',
    );
  });

  it('disabled edge links have no href', () => {
    render(<Pagination total={4} page={1} getHref={(n) => `?p=${n}`} />);
    const prev = screen.getByRole('link', { name: 'Previous' });
    expect(prev).not.toHaveAttribute('href');
    expect(prev).toHaveAttribute('aria-disabled', 'true');
  });

  it('compact variant reads "page 3 of 12"', () => {
    const { container } = render(
      <Pagination total={12} page={3} variant='compact' boxed size='sm' />,
    );
    expect(container.querySelector('.pagination')!.className).toBe(
      'pagination pagination-boxed pagination-sm',
    );
    expect(container.querySelector('.pagination-summary')).toHaveTextContent(
      'page 3 of 12',
    );
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Pagination total={20} defaultPage={7} getHref={(n) => `?p=${n}`} />,
    );
    await expectNoA11yViolations(container);
  });
});

describe('Steps', () => {
  const slip = [
    { title: 'Submitted', description: 'Salma Nour · 02 Oct' },
    { title: 'Manager', description: 'Omar Fathy · 03 Oct' },
    { title: 'Finance' },
    { title: 'Paid' },
  ];

  it('derives done / current / upcoming from the index', () => {
    const { container } = render(
      <Steps items={slip} current={2} aria-label='Invoice route' />,
    );
    const steps = container.querySelectorAll('li');
    expect(steps[0]!.className).toBe('step is-done');
    expect(steps[1]!.className).toBe('step is-done');
    expect(steps[2]!.className).toBe('step is-current');
    expect(steps[2]).toHaveAttribute('aria-current', 'step');
    expect(steps[3]!.className).toBe('step');
    expect(steps[0]).toHaveTextContent('Completed: Submitted');
    expect(steps[3]).toHaveTextContent('Not started: Paid');
  });

  it('supports errors, vertical layout and all-done', () => {
    const items = slip.map((s, i) => (i === 1 ? { ...s, error: true } : s));
    const { container, rerender } = render(
      <Steps items={items} current={1} orientation='vertical' />,
    );
    expect(container.querySelector('ol')).toHaveClass(
      'steps',
      'steps-vertical',
    );
    expect(container.querySelectorAll('li')[1]).toHaveClass('is-error');
    rerender(<Steps items={slip} current={slip.length} />);
    expect(container.querySelectorAll('.is-done')).toHaveLength(4);
    expect(container.querySelector('[aria-current]')).toBeNull();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Steps items={slip} current={1} aria-label='Invoice route' />,
    );
    await expectNoA11yViolations(container);
  });
});

const NAV: NavEntry[] = [
  { label: 'Overview', href: '/', icon: <svg /> },
  { heading: 'Finance' },
  { label: 'Invoices', href: '/invoices', badge: 12 },
  {
    label: 'Approvals',
    id: 'approvals',
    items: [
      { label: 'Expenses', href: '/approvals/expenses' },
      { label: 'Leave', href: '/approvals/leave' },
    ],
  },
  {
    label: 'Vendors',
    id: 'vendors',
    items: [{ label: 'Contracts', href: '/vendors/contracts' }],
  },
  { label: 'Archive', href: '/archive', disabled: true },
];

describe('Nav', () => {
  it('marks the current page and opens its group', () => {
    render(<Nav items={NAV} currentHref='/approvals/leave' />);
    expect(screen.getByRole('link', { name: 'Leave' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(screen.getByRole('link', { name: /Invoices/ })).not.toHaveAttribute(
      'aria-current',
    );

    const approvals = screen.getByRole('button', { name: 'Approvals' });
    expect(approvals).toHaveAttribute('aria-expanded', 'true');
    expect(approvals).toHaveClass('has-current');
    expect(
      document.getElementById(approvals.getAttribute('aria-controls')!),
    ).toHaveClass('collapse', 'is-open');
    expect(screen.getByRole('button', { name: 'Vendors' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('renders headings, badges and disabled links', () => {
    const { container } = render(<Nav items={NAV} label='Back office' />);
    expect(
      screen.getByRole('navigation', { name: 'Back office' }),
    ).toBeInTheDocument();
    expect(container.querySelector('.nav-label')).toHaveTextContent('Finance');
    expect(container.querySelector('.nav-badge')).toHaveTextContent('12');
    const archive = screen.getByRole('link', { name: 'Archive' });
    expect(archive).toHaveAttribute('aria-disabled', 'true');
    expect(archive).not.toHaveAttribute('href');
  });

  it('toggles groups and reports the open ids', async () => {
    const user = userEvent.setup();
    const onOpenGroupsChange = vi.fn();
    render(<Nav items={NAV} onOpenGroupsChange={onOpenGroupsChange} />);
    const vendors = screen.getByRole('button', { name: 'Vendors' });
    await user.click(vendors);
    expect(vendors).toHaveAttribute('aria-expanded', 'true');
    expect(onOpenGroupsChange).toHaveBeenLastCalledWith(['vendors']);
    await user.click(vendors);
    expect(vendors).toHaveAttribute('aria-expanded', 'false');
  });

  it('passes href to linkAs', () => {
    const RouterLink = ({ href, ...p }: ComponentPropsWithRef<'a'>) => (
      <a data-to={href} href={href} {...p} />
    );
    render(<Nav items={NAV} linkAs={RouterLink} />);
    expect(screen.getByRole('link', { name: /Invoices/ })).toHaveAttribute(
      'data-to',
      '/invoices',
    );
  });

  it('has no axe violations', async () => {
    const { container } = render(<Nav items={NAV} currentHref='/invoices' />);
    await expectNoA11yViolations(container);
  });
});

describe('Sidebar', () => {
  it('renders brand, body, footer and drawer state', () => {
    const { container } = render(
      <Sidebar
        brand={<a href='/'>Halden</a>}
        footer='Mona Adel'
        open
        aria-label='Sidebar'
      >
        <p>body</p>
      </Sidebar>,
    );
    const aside = screen.getByRole('complementary', { name: 'Sidebar' });
    expect(aside.className).toBe('sidebar is-open');
    expect(aside.querySelector('.sidebar-header')).toHaveTextContent('Halden');
    expect(aside.querySelector('.sidebar-body')).toHaveTextContent('body');
    expect(aside.querySelector('.sidebar-footer')).toHaveTextContent(
      'Mona Adel',
    );
    expect(container.querySelector('.sidebar-backdrop')).toBeNull();
  });

  it('closes from the button, the backdrop and Escape', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { container } = render(
      <Sidebar open onClose={onClose}>
        <a href='/x'>Invoices</a>
      </Sidebar>,
    );
    await user.click(screen.getByRole('button', { name: 'Close menu' }));
    await user.click(container.querySelector('.sidebar-backdrop')!);
    fireEvent.keyDown(screen.getByRole('link'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(3);
  });

  it('static sidebars never become drawers', () => {
    const { container } = render(
      <Sidebar static onClose={() => {}}>
        x
      </Sidebar>,
    );
    expect(container.querySelector('aside')).toHaveClass(
      'sidebar',
      'sidebar-static',
    );
    expect(
      container.querySelector('.sidebar-close, .sidebar-backdrop'),
    ).toBeNull();
  });
});

describe('Navbar', () => {
  it('folds links into a collapse driven by the toggle', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Navbar
        brand={<Navbar.Brand href='/'>Halden</Navbar.Brand>}
        end={<button type='button'>Help</button>}
      >
        <Navbar.Link href='/' active>
          Dashboard
        </Navbar.Link>
        <Navbar.Link href='/rota'>Rota</Navbar.Link>
      </Navbar>,
    );
    const toggle = screen.getByRole('button', { name: 'Menu' });
    const region = document.getElementById(
      toggle.getAttribute('aria-controls')!,
    )!;
    expect(region).toHaveClass('navbar-collapse', 'collapse');
    expect(region).not.toHaveClass('is-open');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);
    expect(region).toHaveClass('is-open');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    const nav = within(screen.getByRole('navigation', { name: 'Main' }));
    expect(nav.getByRole('link', { name: 'Dashboard' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(container.querySelector('.navbar-end')).toHaveTextContent('Help');
  });

  it('closes the menu after a link is chosen', async () => {
    const user = userEvent.setup();
    render(
      <Navbar defaultMenuOpen>
        <Navbar.Link href='#rota'>Rota</Navbar.Link>
      </Navbar>,
    );
    await user.click(screen.getByRole('link', { name: 'Rota' }));
    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('has no toggle without links', () => {
    render(<Navbar brand='Halden' sticky />);
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByRole('banner')).toHaveClass('navbar', 'navbar-sticky');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Navbar brand={<Navbar.Brand href='/'>Halden</Navbar.Brand>}>
        <Navbar.Link href='/' active>
          Dashboard
        </Navbar.Link>
        <Navbar.Link href='/tickets'>Tickets</Navbar.Link>
      </Navbar>,
    );
    await expectNoA11yViolations(container);
  });
});

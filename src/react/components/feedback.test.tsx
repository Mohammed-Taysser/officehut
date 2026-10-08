import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../tests/a11y.js';
import { Chip, ChipList } from './Chip/index.js';
import { Divider } from './Divider/index.js';
import { EmptyState } from './EmptyState/index.js';
import { Kbd } from './Kbd/index.js';
import { Progress, progressPercent } from './Progress/index.js';
import { Ribbon } from './Ribbon/index.js';
import { Skeleton, SkeletonText } from './Skeleton/index.js';
import {
  Sparkline,
  sparklinePath,
  sparklinePoints,
  sparklinePolyline,
} from './Sparkline/index.js';
import { Spinner } from './Spinner/index.js';
import { Stat, StatGroup } from './Stat/index.js';
import { Status } from './Status/index.js';
import { Table } from './Table/index.js';
import { Timeline } from './Timeline/index.js';
import { Tracking } from './Tracking/index.js';

describe('Progress', () => {
  it('exposes progressbar semantics and is named by its label', () => {
    render(
      <Progress
        value={70}
        label='Q3 marketing budget'
        showValue
        color='warning'
      />,
    );
    const bar = screen.getByRole('progressbar', {
      name: 'Q3 marketing budget',
    });
    expect(bar).toHaveAttribute('aria-valuenow', '70');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
    expect(bar.className).toBe('progress progress-warning');
    expect(screen.getByText('70%')).toHaveClass('progress-value');
    expect(
      bar
        .querySelector<HTMLElement>('.progress-bar')!
        .style.getPropertyValue('--_value'),
    ).toBe('70%');
  });

  it('maps custom ranges and clamps', () => {
    expect(progressPercent(84_200, 0, 120_000)).toBeCloseTo(70.17, 1);
    expect(progressPercent(150, 0, 100)).toBe(100);
    expect(progressPercent(-5)).toBe(0);
    expect(progressPercent(5, 10, 10)).toBe(0);
    render(<Progress value={140} aria-label='Over budget' />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '100',
    );
  });

  it('indeterminate drops aria-valuenow', () => {
    render(<Progress aria-label='Importing payroll' />);
    const bar = screen.getByRole('progressbar', { name: 'Importing payroll' });
    expect(bar).not.toHaveAttribute('aria-valuenow');
    expect(bar).toHaveClass('progress-indeterminate');
  });

  it('stacked segments sum and describe themselves', () => {
    render(
      <Progress
        aria-label='Invoices this quarter'
        segments={[
          { value: 60, color: 'success', label: 'Paid' },
          { value: 25, color: 'warning', label: 'Pending' },
        ]}
      />,
    );
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '85');
    expect(bar).toHaveAttribute('aria-valuetext', 'Paid 60%, Pending 25%');
    expect(bar.querySelectorAll('.progress-bar')).toHaveLength(2);
    expect(bar.querySelector('.progress-bar-success')).not.toBeNull();
  });

  it('ruled + scale + no a11y violations', async () => {
    const { container } = render(
      <>
        <Progress value={42} label='Seats filled' ruled scale />
        <Progress value={18} aria-label='Disk' size='sm' />
      </>,
    );
    expect(
      screen.getByRole('progressbar', { name: 'Seats filled' }),
    ).toHaveClass('progress-ruled');
    expect(container.querySelector('.progress-scale')).not.toBeNull();
    await expectNoA11yViolations(container);
  });
});

describe('Spinner', () => {
  it('is a status with a hidden label', () => {
    render(<Spinner label='Loading invoices' size='sm' color='primary' />);
    const s = screen.getByRole('status');
    expect(s).toHaveTextContent('Loading invoices');
    expect(s.className).toBe('spinner spinner-sm spinner-primary');
  });

  it('dots variant renders three dots', () => {
    const { container } = render(<Spinner variant='dots' />);
    expect(
      container.querySelectorAll('.spinner-dots > span:not(.visually-hidden)'),
    ).toHaveLength(3);
  });
});

describe('Skeleton', () => {
  it('is hidden from AT and sizes via custom properties', () => {
    const { container } = render(<Skeleton variant='circle' width={40} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveAttribute('aria-hidden', 'true');
    expect(el.className).toBe('skeleton skeleton-circle');
    expect(el.style.getPropertyValue('--_w')).toBe('40px');
  });

  it('SkeletonText renders n lines, last one unsized', () => {
    const { container } = render(<SkeletonText lines={4} ruled />);
    const lines = container.querySelectorAll<HTMLElement>('.skeleton-text');
    expect(lines).toHaveLength(4);
    expect(container.firstElementChild).toHaveClass(
      'skeleton-paragraph',
      'skeleton-ruled',
    );
    expect(lines[3]!.style.getPropertyValue('--_w')).toBe('');
  });
});

describe('EmptyState', () => {
  it('renders the in-tray, title, text, note and actions', async () => {
    const { container } = render(
      <EmptyState
        title='No invoices to approve'
        note='Nothing waiting on you.'
        actions={<button type='button'>Upload invoice</button>}
        bordered
      >
        New invoices from suppliers land here.
      </EmptyState>,
    );
    expect(
      screen.getByRole('heading', { name: 'No invoices to approve' }),
    ).toHaveClass('empty-title');
    expect(container.querySelector('.empty-icon svg')).not.toBeNull();
    expect(screen.getByText('Nothing waiting on you.')).toHaveClass(
      'empty-note',
    );
    expect(container.firstElementChild).toHaveClass('empty', 'empty-bordered');
    await expectNoA11yViolations(container);
  });

  it('icon={false} removes the drawing', () => {
    const { container } = render(<EmptyState icon={false} title='Nothing' />);
    expect(container.querySelector('.empty-icon')).toBeNull();
  });
});

describe('Status', () => {
  it('dot + label, pulse class', () => {
    const { container } = render(
      <Status color='success' pulse>
        On call
      </Status>,
    );
    const el = container.firstElementChild!;
    expect(el.className).toBe('status status-success status-pulse');
    expect(el.querySelector('.status-dot')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
    expect(el).toHaveTextContent('On call');
  });

  it('dot-only with aria-label becomes an image', () => {
    render(<Status color='danger' aria-label='Offline' />);
    expect(screen.getByRole('img', { name: 'Offline' })).toHaveClass(
      'status-danger',
    );
  });
});

describe('Ribbon', () => {
  it('builds class names', () => {
    render(
      <Ribbon color='success' placement='start'>
        Paid
      </Ribbon>,
    );
    expect(screen.getByText('Paid').parentElement!.className).toBe(
      'ribbon ribbon-success ribbon-start',
    );
  });
});

describe('Timeline', () => {
  it('renders a list with time elements and day separators', () => {
    render(
      <Timeline ruled aria-label='Ticket OPS-311'>
        <Timeline.Day>Tue 7 Oct</Timeline.Day>
        <Timeline.Item
          time='09:14'
          dateTime='2026-10-07T09:14'
          color='danger'
          title='Ticket opened'
        >
          Printer on the 3rd floor jams on every job.
        </Timeline.Item>
        <Timeline.Item time='11:02' hollow title='Technician booked' />
      </Timeline>,
    );
    const list = screen.getByRole('list', { name: 'Ticket OPS-311' });
    expect(list).toHaveClass('timeline', 'timeline-ruled');
    expect(list.querySelectorAll('li')).toHaveLength(3);
    const time = list.querySelector('time')!;
    expect(time).toHaveAttribute('datetime', '2026-10-07T09:14');
    expect(
      list.querySelector('.timeline-item-danger .timeline-text'),
    ).toHaveTextContent('Printer');
    expect(list.querySelector('.is-hollow')).not.toBeNull();
  });
});

describe('Table', () => {
  const rows = [
    ['Office rent', '42,000.00'],
    ['Stationery', '1,240.50'],
  ];

  it('maps variants to classes and wraps when responsive', async () => {
    const { container } = render(
      <Table ledger striped hover size='sm' stickyHeader responsive='20rem'>
        <caption>September expenses</caption>
        <thead>
          <tr>
            <th scope='col'>Account</th>
            <th scope='col' className='num'>
              Amount (EGP)
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, n]) => (
            <tr key={a}>
              <td>{a}</td>
              <td className='num'>{n}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope='row'>Total</th>
            <td className='num'>43,240.50</td>
          </tr>
        </tfoot>
      </Table>,
    );
    const wrap = container.firstElementChild as HTMLElement;
    expect(wrap).toHaveClass('table-responsive');
    expect(wrap.style.getPropertyValue('--_max-h')).toBe('20rem');
    expect(
      screen.getByRole('table', { name: 'September expenses' }).className,
    ).toBe(
      'table table-striped table-hover table-sm table-ledger table-sticky',
    );
    await expectNoA11yViolations(container);
  });

  it('plain table renders without wrapper', () => {
    const { container } = render(
      <Table>
        <tbody>
          <tr>
            <td>x</td>
          </tr>
        </tbody>
      </Table>,
    );
    expect(container.firstElementChild!.tagName).toBe('TABLE');
  });
});

describe('Divider', () => {
  it('is a separator named by its label', () => {
    render(<Divider label='Archived' align='start' variant='dotted' />);
    const sep = screen.getByRole('separator', { name: 'Archived' });
    expect(sep.className).toBe('divider divider-start divider-dotted');
  });

  it('vertical sets aria-orientation', () => {
    render(<Divider vertical />);
    expect(screen.getByRole('separator')).toHaveAttribute(
      'aria-orientation',
      'vertical',
    );
  });
});

describe('Kbd', () => {
  it('single key and chord', () => {
    const { container } = render(
      <>
        <Kbd>Esc</Kbd>
        <Kbd keys={['Ctrl', 'K']} variant='pencil' />
      </>,
    );
    expect(screen.getByText('Esc').className).toBe('kbd');
    const combo = container.querySelector('.kbd-combo')!;
    expect(combo.tagName).toBe('KBD');
    expect(combo.querySelectorAll('kbd.kbd.kbd-pencil')).toHaveLength(2);
    expect(combo.querySelector('.kbd-sep')).toHaveTextContent('+');
  });
});

describe('Chip', () => {
  it('removes via onRemove with a named button', async () => {
    const user = userEvent.setup();
    function Filters() {
      const [chips, setChips] = useState(['Overdue', 'Cairo office']);
      return (
        <ChipList>
          {chips.map((c) => (
            <Chip
              key={c}
              label='Filter'
              onRemove={() => setChips((x) => x.filter((y) => y !== c))}
            >
              {c}
            </Chip>
          ))}
        </ChipList>
      );
    }
    render(<Filters />);
    await user.click(screen.getByRole('button', { name: 'Remove Overdue' }));
    expect(screen.queryByText('Overdue')).toBeNull();
    expect(screen.getByText('Cairo office')).toBeInTheDocument();
  });

  it('renders as a toggle button with type=button', async () => {
    const onClick = vi.fn();
    render(
      <Chip as='button' aria-pressed color='primary' onClick={onClick}>
        Unpaid
      </Chip>,
    );
    const btn = screen.getByRole('button', { name: 'Unpaid' });
    expect(btn).toHaveAttribute('type', 'button');
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    expect(btn.className).toBe('chip chip-primary');
    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe('Sparkline', () => {
  it('sparklinePoints maps min to bottom and max to top', () => {
    expect(sparklinePoints([0, 10, 5], 100, 20, 0)).toEqual([
      [0, 20],
      [50, 0],
      [100, 10],
    ]);
  });

  it('applies padding and rounds to 2 decimals', () => {
    const pts = sparklinePoints([1, 2, 3, 4], 10, 10, 1);
    expect(pts[0]).toEqual([1, 9]);
    expect(pts[3]).toEqual([9, 1]);
    expect(pts[1]![0]).toBe(3.67);
  });

  it('handles empty, single, flat and non-finite input', () => {
    expect(sparklinePoints([])).toEqual([]);
    expect(sparklinePoints([7], 80, 20)).toEqual([[40, 10]]);
    expect(sparklinePoints([3, 3, 3], 80, 20, 0).map((p) => p[1])).toEqual([
      10, 10, 10,
    ]);
    expect(sparklinePoints([1, Number.NaN, 3], 10, 10, 0)).toEqual([
      [0, 10],
      [10, 0],
    ]);
  });

  it('builds polyline points and path data', () => {
    const pts = sparklinePoints([0, 10], 10, 10, 0);
    expect(sparklinePolyline(pts)).toBe('0,10 10,0');
    expect(sparklinePath(pts)).toBe('M0 10 L10 0');
    expect(sparklinePath(pts, { baseline: 10 })).toBe(
      'M0 10 L10 0 L10 10 L0 10 Z',
    );
    expect(sparklinePath([])).toBe('');
  });

  it('renders an img when labelled, hidden otherwise', () => {
    const { container } = render(
      <>
        <Sparkline
          values={[3, 5, 4, 8]}
          label='Open tickets, rising'
          color='danger'
          area
        />
        <Sparkline values={[1, 2]} />
      </>,
    );
    const img = screen.getByRole('img', { name: 'Open tickets, rising' });
    expect(img).toHaveClass('sparkline', 'sparkline-danger');
    expect(img.querySelector('polyline')).toHaveAttribute('points');
    expect(img.querySelector('.sparkline-area')).not.toBeNull();
    expect(container.querySelectorAll('svg')[1]).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });
});

describe('Stat', () => {
  it('renders label, value, delta tone and chart slot', () => {
    const { container } = render(
      <StatGroup>
        <Stat
          label='Overdue'
          value='12'
          delta='+3'
          trend='up'
          sentiment='bad'
          meta='vs. last week'
          chart={<span data-testid='c' />}
          color='danger'
        />
        <Stat
          label='Paid this month'
          value='EGP 318k'
          delta='+12%'
          trend='up'
          note='best month this year'
        />
      </StatGroup>,
    );
    const [overdue, paid] = container.querySelectorAll('.stat');
    expect(overdue!.className).toBe('stat stat-danger');
    expect(overdue!.querySelector('.stat-delta')!.className).toBe(
      'stat-delta is-up stat-delta-bad',
    );
    expect(overdue!.querySelector('.stat-delta')).toHaveTextContent('up +3');
    expect(screen.getByTestId('c').parentElement).toHaveClass('stat-chart');
    expect(paid!.querySelector('.stat-delta')).toHaveClass('stat-delta-good');
    expect(paid!.querySelector('.stat-note')).toHaveTextContent(
      'best month this year',
    );
  });
});

describe('Tracking', () => {
  it('renders a labelled list of blocks with tooltips', async () => {
    const { container } = render(
      <Tracking
        aria-label='API uptime, last 4 days'
        startLabel='4 days ago'
        endLabel='Today'
        items={[
          { status: 'success', label: 'Sat 4 Oct — operational' },
          { status: 'warning', label: 'Sun 5 Oct — degraded 14 min' },
          { status: 'danger', label: 'Mon 6 Oct — outage 42 min' },
          { status: 'empty', label: 'Tue 7 Oct — no data yet' },
        ]}
      />,
    );
    const list = screen.getByRole('list', { name: 'API uptime, last 4 days' });
    const blocks = screen.getAllByRole('listitem');
    expect(blocks).toHaveLength(4);
    expect(blocks[1]).toHaveAttribute('title', 'Sun 5 Oct — degraded 14 min');
    expect(blocks[1]).toHaveAccessibleName('Sun 5 Oct — degraded 14 min');
    expect(blocks[2]!.className).toBe('tracking-block tracking-block-danger');
    expect(blocks[3]!.className).toBe('tracking-block');
    expect(list.nextElementSibling).toHaveClass('tracking-legend');
    await expectNoA11yViolations(container);
  });
});

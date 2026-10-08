import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../tests/a11y.js';
import {
  Chalkboard,
  Checklist,
  Corkboard,
  DateTile,
  ErrorBoundary,
  Grade,
  Marker,
  Notebook,
  PencilLoader,
  Pinned,
  Sticker,
  Sticky,
  Tabs,
  Timetable,
  timetableGrid,
  toLocalDate,
} from '../index.js';

describe('Sticky / Marker / Sticker / Chalkboard', () => {
  it('builds classes', () => {
    const { container } = render(
      <>
        <Sticky color='pink' hand taped title='Remember'>
          Order toner
        </Sticky>
        <Marker>due Friday</Marker>
        <Marker variant='circle' pen='blue'>
          12
        </Marker>
        <Marker variant='strike'>old price</Marker>
        <Sticker shape='star' color='success'>
          Top
        </Sticker>
        <Chalkboard hand>Agenda</Chalkboard>
      </>,
    );
    expect(
      container.querySelector(
        '.sticky.sticky-pink.sticky-hand.sticky-taped .sticky-title',
      ),
    ).toHaveTextContent('Remember');
    expect(container.querySelector('mark.highlight')).toHaveTextContent(
      'due Friday',
    );
    expect(container.querySelector('span.circled.pen-blue')).not.toBeNull();
    expect(container.querySelector('s.strike-pen')).not.toBeNull();
    expect(
      container.querySelector('.sticker.sticker-success.sticker-star'),
    ).not.toBeNull();
    expect(
      container.querySelector('.chalkboard.chalkboard-hand'),
    ).not.toBeNull();
  });
});

describe('Grade', () => {
  it('reads fractions aloud', () => {
    render(<Grade value='9/10' remark='nearly there' />);
    expect(screen.getByRole('img', { name: '9 out of 10' })).toHaveClass(
      'grade',
    );
    expect(screen.getByText('nearly there')).toHaveClass('grade-remark');
  });
});

describe('Timetable', () => {
  const days = ['Sun', 'Mon', 'Tue'];
  const slots = ['09:00', '10:00', '11:00'];

  it('computes rowspans and covered cells', () => {
    const grid = timetableGrid(days, slots, [
      { day: 'Mon', slot: '09:00', span: 2, title: 'Standup' },
    ]);
    expect(grid[0]![1]).toMatchObject({ span: 2 });
    expect(grid[1]![1]).toBe('covered');
    expect(grid[2]![1]).toBeNull();
  });

  it('clamps spans to the grid and ignores unknown days', () => {
    const grid = timetableGrid(days, slots, [
      { day: 2, slot: 2, span: 5, title: 'Late' },
      { day: 'Fri', slot: 0, title: 'Nope' },
    ]);
    expect(grid[2]![2]).toMatchObject({ span: 1 });
    expect(grid.flat().filter(Boolean)).toHaveLength(1);
  });

  it('renders an accessible table', async () => {
    const { container } = render(
      <Timetable
        caption='Front desk rota'
        days={days}
        slots={slots}
        today='Mon'
        entries={[
          {
            day: 'Mon',
            slot: 0,
            span: 2,
            title: 'Salma',
            meta: 'Front desk',
            color: 'aurora',
          },
        ]}
      />,
    );
    expect(screen.getByRole('columnheader', { name: 'Mon' })).toHaveAttribute(
      'aria-current',
      'date',
    );
    expect(
      container.querySelector('td[rowspan="2"] .lesson.lesson-aurora'),
    ).toHaveTextContent('Salma');
    await expectNoA11yViolations(container);
  });
});

describe('Checklist', () => {
  it('toggles with real checkboxes', async () => {
    const onChange = vi.fn();
    render(
      <Checklist
        aria-label='Month-end close'
        onChange={onChange}
        defaultValue={['a']}
        items={[
          { id: 'a', label: 'Reconcile bank account' },
          { id: 'b', label: 'Accrue utilities', meta: 'Thu', late: true },
        ]}
      />,
    );
    const box = screen.getByRole('checkbox', { name: 'Accrue utilities' });
    expect(
      screen.getByRole('checkbox', { name: 'Reconcile bank account' }),
    ).toBeChecked();
    await userEvent.click(box);
    expect(onChange).toHaveBeenLastCalledWith(['a', 'b']);
    expect(box).toBeChecked();
    expect(screen.getByText('Thu')).toHaveClass('is-late');
    await expectNoA11yViolations(document.body);
  });
});

describe('DateTile (local calendar day)', () => {
  it('reads a bare YYYY-MM-DD as that local day', () => {
    const d = toLocalDate('2026-10-14');
    expect([d.getFullYear(), d.getMonth(), d.getDate()]).toEqual([2026, 9, 14]);
    render(<DateTile date='2026-10-14' locale='en-GB' />);
    const t = screen.getByLabelText(/14 October 2026/);
    expect(t).toHaveAttribute('datetime', '2026-10-14');
  });

  it('datetime matches the visible day for a local-midnight Date', () => {
    render(<DateTile date={new Date(2026, 0, 1)} locale='en-GB' />);
    expect(screen.getByLabelText(/1 January 2026/)).toHaveAttribute(
      'datetime',
      '2026-01-01',
    );
  });
});

describe('Binder tabs (vertical)', () => {
  it('use Up/Down and announce vertical orientation', async () => {
    const user = userEvent.setup();
    render(
      <div className='binder'>
        <Tabs defaultValue='leave'>
          <Tabs.List variant='index' aria-label='Handbook'>
            <Tabs.Tab value='leave'>Leave</Tabs.Tab>
            <Tabs.Tab value='travel'>Travel</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value='leave'>21 days</Tabs.Panel>
          <Tabs.Panel value='travel'>Book via the portal</Tabs.Panel>
        </Tabs>
      </div>,
    );
    expect(screen.getByRole('tablist')).toHaveAttribute(
      'aria-orientation',
      'vertical',
    );
    await user.click(screen.getByRole('tab', { name: 'Leave' }));
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('tab', { name: 'Travel' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await user.keyboard('{ArrowUp}');
    expect(screen.getByRole('tab', { name: 'Leave' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });
});

describe('DateTile', () => {
  it('exposes the full date to assistive tech', () => {
    render(<DateTile date='2026-10-14T12:00:00Z' locale='en-GB' />);
    const t = screen.getByLabelText(/14 October 2026/);
    expect(t.tagName).toBe('TIME');
    expect(t).toHaveAttribute('datetime', '2026-10-14');
  });
});

describe('Corkboard / Notebook / PencilLoader', () => {
  it('pins and loads', () => {
    const { container } = render(
      <>
        <Corkboard>
          <Pinned pin='blue' tilt='left'>
            Fire drill Thursday
          </Pinned>
        </Corkboard>
        <Notebook holes squared>
          <p>notes</p>
        </Notebook>
        <PencilLoader label='Fetching invoices' />
      </>,
    );
    expect(
      container.querySelector('.corkboard > .pinned.pin-blue.tilt-left'),
    ).not.toBeNull();
    expect(
      container.querySelector('.notebook.notebook-holes.notebook-squared'),
    ).not.toBeNull();
    expect(screen.getByRole('status')).toHaveTextContent('Fetching invoices');
  });
});

describe('ErrorBoundary', () => {
  function Boom(): never {
    throw new Error('ledger out of balance');
  }

  it('shows a sheet, details on request, and resets on resetKeys', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const onError = vi.fn();
    const { rerender } = render(
      <ErrorBoundary onError={onError} resetKeys={['/a']}>
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.getByRole('alert')).toHaveClass('error-sheet');
    expect(onError).toHaveBeenCalled();

    rerender(
      <ErrorBoundary resetKeys={['/b']}>
        <p>fine now</p>
      </ErrorBoundary>,
    );
    expect(screen.getByText('fine now')).toBeInTheDocument();
    spy.mockRestore();
  });

  it('handles falsy throws without looping', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    function Zero(): never {
      throw 0;
    }
    render(
      <ErrorBoundary variant='slip' title='Totals unavailable'>
        <Zero />
      </ErrorBoundary>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Totals unavailable');
    spy.mockRestore();
  });

  it('can hide the reload button', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary showReload={false}>
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.queryByRole('button', { name: 'Reload page' })).toBeNull();
    expect(
      screen.getByRole('button', { name: 'Try again' }),
    ).toBeInTheDocument();
    spy.mockRestore();
  });

  it('slip variant offers a retry', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary variant='slip'>
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.getByRole('alert')).toHaveClass('error-slip');
    expect(
      screen.getByRole('button', { name: 'Try again' }),
    ).toBeInTheDocument();
    spy.mockRestore();
  });
});

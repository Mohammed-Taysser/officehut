import {
  IconBell,
  IconBuildingWarehouse,
  IconCalendarTime,
  IconChevronDown,
  IconFileExport,
  IconFileInvoice,
  IconFileTypeCsv,
  IconFileTypePdf,
  IconLayoutDashboard,
  IconLifebuoy,
  IconMail,
  IconMoon,
  IconPlus,
  IconReceipt,
  IconSearch,
  IconShoppingCart,
  IconSun,
  IconTruck,
  IconTruckDelivery,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type FormEvent,
  type ReactNode,
} from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Avatar,
  AvatarList,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Chalkboard,
  Checklist,
  DateTile,
  Dropdown,
  EmptyState,
  Field,
  Grade,
  Input,
  Marker,
  Modal,
  Nav,
  Navbar,
  Pagination,
  Progress,
  Select,
  Sidebar,
  Sparkline,
  Stat,
  StatGroup,
  Status,
  Sticky,
  Table,
  Tabs,
  Textarea,
  Timeline,
  Tracking,
  toast,
  type NavEntry,
} from 'officehut/react';
import { DocPage } from '../../components/DocPage';
import {
  DEPOT_OPTIONS,
  STATUS,
  SUPPLIER_OPTIONS,
  TODAY,
  activity as initialActivity,
  cashFlow,
  closeTasks,
  dispatchedWeeks,
  egp,
  invoices,
  onTimeWeeks,
  overdueTotal,
  overdueWeeks,
  revenueByDepot,
  revenueWeeks,
  standup,
  suppliers,
  systems,
  upcoming,
  type Activity,
  type InvoiceStatus,
} from './dashboard-data';
import s from './dashboard.module.scss';

// ---- helpers ------------------------------------------------------------------------

/** Links inside the preview frame must not change the docs page URL. */
function FrameLink({ onClick, ...rest }: ComponentPropsWithRef<'a'>) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
      }}
    />
  );
}

function Logo() {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      strokeWidth={1.5}
      strokeLinecap='round'
      aria-hidden
    >
      <rect
        x='2.75'
        y='2.75'
        width='18.5'
        height='18.5'
        rx='3'
        stroke='currentColor'
      />
      <path
        d='M6.5 10c1.8-1.8 3.7 1.8 5.5 0s3.7 1.8 5.5 0'
        stroke='currentColor'
        style={{ color: 'var(--oh-primary)' }}
      />
      <path
        d='M6.5 15c1.8-1.8 3.7 1.8 5.5 0s3.7 1.8 5.5 0'
        stroke='currentColor'
        style={{ color: 'var(--oh-primary)' }}
      />
    </svg>
  );
}

const fmtDay = (iso: string) => dayjs(iso).format('DD MMM');
const daysLate = (iso: string) =>
  dayjs(TODAY).startOf('day').diff(dayjs(iso), 'day');

interface TipPayload {
  name?: unknown;
  value?: unknown;
  dataKey?: unknown;
}

/** Chart tooltip on paper: label, then one mono figure per series. */
function ChartTip({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean;
  payload?: readonly TipPayload[];
  label?: unknown;
  unit: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className={s.tip}>
      <p className={s.tipLabel}>{String(label)}</p>
      {payload.map((p) => (
        <p key={String(p.dataKey)} className={s.tipRow}>
          <span
            className={s.swatch}
            data-series={String(p.dataKey)}
            aria-hidden
          />
          <span>{String(p.name)}</span>
          <span className={s.tipValue}>
            {Number(p.value).toLocaleString('en-US')} <small>{unit}</small>
          </span>
        </p>
      ))}
    </div>
  );
}

// ---- sidebar navigation ------------------------------------------------------------------

const SECTIONS: Record<string, string> = {
  overview: 'Overview',
  shipments: 'Shipments',
  warehouses: 'Warehouses',
  fleet: 'Fleet',
  invoices: 'Invoices',
  orders: 'Purchase orders',
  expenses: 'Expenses',
  rota: 'Staff rota',
  tickets: 'Help desk',
};

function navItems(go: (key: string) => void): NavEntry[] {
  const link = (key: string, icon: ReactNode, badge?: number) => ({
    label: SECTIONS[key],
    href: `#${key}`,
    icon,
    badge,
    onClick: () => go(key),
  });
  return [
    link('overview', <IconLayoutDashboard />),
    { heading: 'Operations' },
    link('shipments', <IconTruckDelivery />, 38),
    link('warehouses', <IconBuildingWarehouse />),
    link('fleet', <IconTruck />),
    { heading: 'Money' },
    link('invoices', <IconFileInvoice />, 13),
    link('orders', <IconShoppingCart />, 4),
    link('expenses', <IconReceipt />),
    { heading: 'People' },
    link('rota', <IconCalendarTime />),
    link('tickets', <IconLifebuoy />, 2),
  ];
}

// ---- the page --------------------------------------------------------------------------

export default function DashboardPage() {
  return (
    <DocPage
      title='Dashboard'
      lead='A week in the operations office of Nile & Delta Supplies, a stationery and logistics firm with depots in Cairo, Alexandria, Giza and Tanta. Every part is an officehut component — open the purchase-order form, tick off the month-end close, page through the invoices, or switch on the night shift.'
    >
      <div className={s.wide}>
        <OfficeApp />
        <p className={`${s.caption} handwriting`}>
          The frame is fixed at 760px so the app scrolls inside it — narrow the
          window to see the sidebar fold into a drawer.
        </p>
      </div>
    </DocPage>
  );
}

function OfficeApp() {
  const [night, setNight] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [section, setSection] = useState('overview');
  const [poOpen, setPoOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [feed, setFeed] = useState<Activity[]>(initialActivity);
  const mainRef = useRef<HTMLDivElement>(null);

  const go = (key: string) => {
    setSection(key);
    setDrawer(false);
  };

  // New section → back to the top of the frame's scroll area.
  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 });
  }, [section]);

  const exported = (title: string, message: string) =>
    toast({ title, message, color: 'success', duration: 4000 });

  return (
    <div className={s.frame} data-oh-theme={night ? 'dark' : undefined}>
      <div className='shell'>
        <Sidebar
          id='ndx-sidebar'
          aria-label='Nile & Delta back office'
          open={drawer}
          onClose={() => setDrawer(false)}
          brand={
            <Sidebar.Brand
              as={FrameLink}
              href='#overview'
              onClick={() => go('overview')}
            >
              <Logo />
              <span className={s.brandName}>
                Nile &amp; Delta
                <small>Supplies</small>
              </span>
            </Sidebar.Brand>
          }
          footer={
            <>
              <Avatar
                name='Karim Fawzy'
                size='sm'
                circle
                presence='online'
                aria-hidden
              />
              <div className='min-w-0'>
                <div className='fw-semibold text-truncate'>Karim Fawzy</div>
                <div className='fs-xs text-muted text-truncate'>
                  Operations lead · Cairo
                </div>
              </div>
            </>
          }
        >
          <Nav
            items={navItems(go)}
            currentHref={`#${section}`}
            linkAs={FrameLink}
            label='Back office'
          />
        </Sidebar>

        <Navbar
          start={
            <>
              <Navbar.Toggle
                aria-label='Open menu'
                aria-controls='ndx-sidebar'
                aria-expanded={drawer}
                onClick={() => setDrawer(true)}
              />
              <Breadcrumb
                className='d-none d-sm-block'
                linkAs={FrameLink}
                items={[
                  { label: 'Nile & Delta', href: '#overview' },
                  {
                    label:
                      section === 'overview' ? 'Operations' : SECTIONS[section],
                  },
                  ...(section === 'overview' ? [{ label: 'Week 41' }] : []),
                ]}
              />
            </>
          }
          end={
            <>
              <div className={s.search}>
                <Input
                  size='sm'
                  type='search'
                  placeholder='Order, invoice, client…'
                  aria-label='Search orders, invoices and clients'
                  icon={<IconSearch size={15} />}
                />
              </div>
              <Button
                size='sm'
                variant='ghost'
                aria-pressed={night}
                icon={night ? <IconSun size={16} /> : <IconMoon size={16} />}
                onClick={() => setNight(!night)}
                title='Night shift: dark paper for the late team'
              >
                <span className={s.nightLabel}>Night shift</span>
              </Button>
              <Dropdown
                placement='bottom-end'
                open={bellOpen}
                onOpenChange={setBellOpen}
                className={s.menu}
                aria-label='Notifications'
                trigger={
                  <Button
                    iconOnly
                    variant='ghost'
                    aria-label='Notifications, 3 unread'
                    className='position-relative'
                  >
                    <IconBell />
                    <Badge color='danger' corner>
                      3
                    </Badge>
                  </Button>
                }
              >
                <Dropdown.Header>Notifications</Dropdown.Header>
                <Dropdown.Item onClick={() => go('invoices')}>
                  INV-2026-0418 is 7 days overdue
                </Dropdown.Item>
                <Dropdown.Item onClick={() => go('shipments')}>
                  3 containers held, Alexandria port
                </Dropdown.Item>
                <Dropdown.Item onClick={() => go('orders')}>
                  PO-1186 waiting for your approval
                </Dropdown.Item>
              </Dropdown>
              <Avatar name='Karim Fawzy' size='sm' circle />
            </>
          }
        />

        {/* In a real app this is <main>; the docs page already has one. */}
        <div ref={mainRef} className={`shell-main ${s.main}`}>
          <div className='container-fluid page'>
            {section === 'overview' ? (
              <Overview
                feed={feed}
                onNewPo={() => setPoOpen(true)}
                exportMenu={
                  <Dropdown
                    placement='bottom-end'
                    open={exportOpen}
                    onOpenChange={setExportOpen}
                    className={s.menu}
                    trigger={
                      <Button
                        icon={<IconFileExport />}
                        iconEnd={<IconChevronDown size={14} />}
                      >
                        Export
                      </Button>
                    }
                  >
                    <Dropdown.Item
                      icon={<IconFileTypeCsv />}
                      onClick={() =>
                        exported(
                          'Invoices exported',
                          'invoices-week-41.csv · 13 rows',
                        )
                      }
                    >
                      Invoices as CSV
                    </Dropdown.Item>
                    <Dropdown.Item
                      icon={<IconFileTypePdf />}
                      onClick={() =>
                        exported(
                          'Report ready',
                          'operations-week-41.pdf · 4 pages',
                        )
                      }
                    >
                      Week 41 report (PDF)
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      icon={<IconMail />}
                      onClick={() =>
                        exported(
                          'Sent to the accountant',
                          'Week 41 pack emailed to Salma Nour',
                        )
                      }
                    >
                      Email to accountant
                    </Dropdown.Item>
                  </Dropdown>
                }
              />
            ) : (
              <EmptyState
                className='mt-6'
                bordered
                title={SECTIONS[section]}
                note='only the overview is filled in for this example'
                actions={
                  <Button
                    color='primary'
                    variant='soft'
                    onClick={() => go('overview')}
                  >
                    Back to the overview
                  </Button>
                }
              >
                This page would list your {SECTIONS[section]?.toLowerCase()}.
                The dashboard is the part we drew.
              </EmptyState>
            )}
          </div>
        </div>
      </div>

      <PurchaseOrderModal
        open={poOpen}
        onClose={() => setPoOpen(false)}
        onRaised={(entry) => setFeed((f) => [entry, ...f])}
      />
    </div>
  );
}

// ---- overview ----------------------------------------------------------------------------

function Overview({
  feed,
  onNewPo,
  exportMenu,
}: {
  feed: Activity[];
  onNewPo: () => void;
  exportMenu: ReactNode;
}) {
  return (
    <>
      <div className='page-header'>
        <div className='min-w-0'>
          <span className='eyebrow'>Thursday 8 October 2026</span>
          <h2 className='page-title'>Operations · week 41</h2>
          <div className={s.subtitle}>
            <span>Four depots · 62 staff on shift</span>
            <AvatarList stacked max={4} size='sm'>
              {[
                'Mona Adel',
                'Salma Nour',
                'Omar Hany',
                'Laila Samir',
                'Youssef Ali',
                'Karim Fawzy',
              ].map((n) => (
                <Avatar key={n} name={n} size='sm' circle />
              ))}
            </AvatarList>
          </div>
        </div>
        <div className='page-actions'>
          {exportMenu}
          <Button color='primary' icon={<IconPlus />} onClick={onNewPo}>
            New purchase order
          </Button>
        </div>
      </div>

      <div className={s.stackLg}>
        <Kpis />

        <div className={s.splitMain}>
          <CashFlowCard />
          <div className={s.today}>
            <p className={`section-title ${s.sectionTitle}`}>
              Today · 09:30 stand-up
            </p>
            <Chalkboard className={s.board}>
              <h3>Room 2B, five minutes</h3>
              <ol className={s.agenda}>
                {standup.map((item) => (
                  <li key={item.who}>
                    <span className={s.agendaWho}>{item.who}</span>
                    {item.what}
                  </li>
                ))}
              </ol>
            </Chalkboard>
          </div>
        </div>

        <InvoicesCard />

        <div className={s.splitEven}>
          <CloseCard />
          <UpcomingCard />
        </div>

        <div className={s.splitFeed}>
          <ActivityCard feed={feed} />
          <div className={s.stack}>
            <UptimeCard />
            <SuppliersCard />
            <Sticky
              as='aside'
              taped
              hand
              title='From Mona'
              className={s.sticky}
            >
              Corniche promised the transfer by Sunday. Nothing by Monday — hold
              their next delivery.
            </Sticky>
          </div>
        </div>
      </div>
    </>
  );
}

function Kpis() {
  return (
    <StatGroup className={s.kpis}>
      <Stat
        label='Revenue · week 41'
        value='412,860'
        unit='EGP'
        delta='+8.4%'
        trend='up'
        meta='vs. week 40'
        note='best week since June'
        chart={
          <Sparkline
            values={revenueWeeks}
            width={160}
            height={32}
            color='primary'
            area
            label='Weekly revenue, last 8 weeks, rising'
          />
        }
      />
      <Stat
        label='Overdue receivables'
        value={egp(overdueTotal, 0)}
        unit='EGP'
        delta='+12.8%'
        trend='up'
        sentiment='bad'
        meta='3 invoices'
        note='chase Corniche Medical'
        chart={
          <Sparkline
            values={overdueWeeks}
            width={160}
            height={32}
            color='danger'
            label='Overdue amount, last 8 weeks, rising'
          />
        }
      />
      <Stat
        label='On-time deliveries'
        value='94.2'
        unit='%'
        delta='−1.3 pts'
        trend='down'
        meta='target 95%'
        note='Alex port held us Tuesday'
        chart={
          <Sparkline
            values={onTimeWeeks}
            width={160}
            height={32}
            color='warning'
            baseline
            label='On-time rate, last 8 weeks, slipping'
          />
        }
      />
      <Stat
        label='Orders dispatched'
        value='1,284'
        delta='+6.1%'
        trend='up'
        meta='vs. week 40'
        chart={
          <Sparkline
            values={dispatchedWeeks}
            width={160}
            height={32}
            color='success'
            label='Orders dispatched, last 8 weeks, rising'
          />
        }
      />
    </StatGroup>
  );
}

function CashFlowCard() {
  const [view, setView] = useState('flow');
  const last = cashFlow[cashFlow.length - 1]!;
  return (
    <Tabs value={view} onChange={setView} defaultValue='flow'>
      <Card className={s.chartCard}>
        <Card.Header>
          <div className='min-w-0'>
            <Card.Title>
              {view === 'flow' ? 'Cash flow' : 'Revenue by depot'}
            </Card.Title>
            <p className='card-subtitle m-0'>
              {view === 'flow'
                ? 'Weeks 30–41 · EGP thousands'
                : 'Third quarter, Jul–Sep · EGP thousands'}
            </p>
          </div>
          <Card.Actions>
            <Tabs.List variant='segmented' aria-label='Chart'>
              <Tabs.Tab value='flow'>Weekly</Tabs.Tab>
              <Tabs.Tab value='depot'>By depot</Tabs.Tab>
            </Tabs.List>
          </Card.Actions>
        </Card.Header>
        <Card.Body>
          <Tabs.Panel value='flow' className={s.chartPanel}>
            <ul className={s.legend}>
              <li>
                <span
                  className={s.swatch}
                  data-series='collected'
                  aria-hidden
                />
                Collected <strong>{last.collected}</strong>
              </li>
              <li>
                <span className={s.swatch} data-series='paidOut' aria-hidden />
                Paid out <strong>{last.paidOut}</strong>
              </li>
              <li className='handwriting'>
                <Marker>+{last.collected - last.paidOut}k</Marker> net this week
              </li>
            </ul>
            <div className={s.chart}>
              <ResponsiveContainer width='100%' height={210}>
                <LineChart
                  data={cashFlow}
                  margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
                >
                  <CartesianGrid vertical={false} stroke='var(--oh-rule)' />
                  <XAxis
                    dataKey='week'
                    tickLine={false}
                    axisLine={{ stroke: 'var(--oh-rule-2)' }}
                    interval='preserveStartEnd'
                  />
                  <YAxis
                    width={34}
                    tickLine={false}
                    axisLine={false}
                    domain={[240, 'auto']}
                  />
                  <Tooltip
                    content={<ChartTip unit='EGP k' />}
                    cursor={{ stroke: 'var(--oh-rule-2)' }}
                    isAnimationActive={false}
                  />
                  <Line
                    type='linear'
                    dataKey='paidOut'
                    name='Paid out'
                    className={s.seriesOut}
                    stroke='var(--oh-pencil)'
                    strokeWidth={2}
                    strokeDasharray='5 4'
                    dot={false}
                    activeDot={{ r: 4 }}
                    isAnimationActive={false}
                  />
                  <Line
                    type='linear'
                    dataKey='collected'
                    name='Collected'
                    className={s.seriesIn}
                    stroke='var(--oh-primary)'
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value='depot' className={s.chartPanel}>
            <div className={s.chart}>
              <ResponsiveContainer width='100%' height={236}>
                <BarChart
                  data={revenueByDepot}
                  layout='vertical'
                  margin={{ top: 4, right: 52, bottom: 0, left: 0 }}
                  barCategoryGap={12}
                >
                  <CartesianGrid horizontal={false} stroke='var(--oh-rule)' />
                  <XAxis type='number' hide />
                  <YAxis
                    type='category'
                    dataKey='depot'
                    width={84}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    content={<ChartTip unit='EGP k' />}
                    cursor={{ fill: 'var(--oh-sunken)' }}
                    isAnimationActive={false}
                  />
                  <Bar
                    dataKey='revenue'
                    name='Revenue'
                    className={s.seriesIn}
                    fill='var(--oh-primary)'
                    radius={[0, 4, 4, 0]}
                    maxBarSize={24}
                    isAnimationActive={false}
                  >
                    <LabelList
                      dataKey='revenue'
                      position='right'
                      formatter={(v: unknown) =>
                        Number(v).toLocaleString('en-US')
                      }
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Tabs.Panel>
        </Card.Body>
      </Card>
    </Tabs>
  );
}

const FILTERS: { value: 'all' | InvoiceStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'sent', label: 'Sent' },
  { value: 'paid', label: 'Paid' },
  { value: 'draft', label: 'Drafts' },
];
const PER_PAGE = 5;

function InvoicesCard() {
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const rows =
    filter === 'all' ? invoices : invoices.filter((i) => i.status === filter);
  const pages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
  const from = (page - 1) * PER_PAGE;
  const shown = rows.slice(from, from + PER_PAGE);
  const pageTotal = shown.reduce((sum, i) => sum + i.amount, 0);

  return (
    <Card tab='Receivables' tabColor='info'>
      <Card.Header>
        <div className='min-w-0'>
          <Card.Title>Invoices</Card.Title>
          <p className='card-subtitle m-0'>
            August to October · sorted by issue date
          </p>
        </div>
      </Card.Header>
      <Tabs
        value={filter}
        defaultValue='all'
        onChange={(v) => {
          setFilter(v);
          setPage(1);
        }}
      >
        <Tabs.List
          aria-label='Filter invoices by status'
          className={s.filterTabs}
        >
          {FILTERS.map((f) => (
            <Tabs.Tab key={f.value} value={f.value}>
              {f.label}
              <span className={s.count}>
                {f.value === 'all'
                  ? invoices.length
                  : invoices.filter((i) => i.status === f.value).length}
              </span>
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {FILTERS.map((f) => (
          <Tabs.Panel key={f.value} value={f.value} className={s.tablePanel}>
            <Table ledger size='sm' responsive className={s.invoiceTable}>
              <caption className='visually-hidden'>
                {f.label} invoices, page {page} of {pages}
              </caption>
              <thead>
                <tr>
                  <th scope='col'>Invoice</th>
                  <th scope='col'>Client</th>
                  <th scope='col'>Due</th>
                  <th scope='col' className='num'>
                    Amount, EGP
                  </th>
                  <th scope='col'>Status</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((inv) => (
                  <tr key={inv.no}>
                    <td className='font-mono fs-xs text-nowrap'>{inv.no}</td>
                    <td>
                      <div className='fw-medium text-truncate'>
                        {inv.client}
                      </div>
                      <div className='fs-xs text-muted'>
                        {inv.city} · issued {fmtDay(inv.issued)}
                      </div>
                    </td>
                    <td className='text-nowrap'>
                      {fmtDay(inv.due)}
                      {inv.status === 'overdue' && (
                        <div className={s.late}>
                          {daysLate(inv.due)} days late
                        </div>
                      )}
                    </td>
                    <td className='num'>{egp(inv.amount)}</td>
                    <td>
                      <Badge
                        variant='stamp'
                        color={STATUS[inv.status].color}
                        className={s.stamp}
                      >
                        {STATUS[inv.status].label}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td />
                  <th scope='row' colSpan={2}>
                    Total on this page
                  </th>
                  <td className='num'>{egp(pageTotal)}</td>
                  <td />
                </tr>
              </tfoot>
            </Table>
          </Tabs.Panel>
        ))}
      </Tabs>
      <Card.Footer>
        <div className='pagination-bar w-100'>
          <span className='pagination-info'>
            Showing <strong>{from + 1}</strong>–
            <strong>{from + shown.length}</strong> of {rows.length}
          </span>
          <Pagination
            total={pages}
            page={page}
            onChange={setPage}
            size='sm'
            label='Invoice pages'
          />
        </div>
      </Card.Footer>
    </Card>
  );
}

function CloseCard() {
  const [done, setDone] = useState<string[]>(['bank', 'payroll']);
  const total = closeTasks.length;
  const finished = done.length === total;
  return (
    <Card className={s.fill}>
      <Card.Header>
        <Card.Title>September close</Card.Title>
        <Card.Actions>
          {finished ? (
            <Badge variant='stamp' color='success' animate>
              Closed
            </Badge>
          ) : (
            <span className='handwriting text-danger'>books shut 15 Oct</span>
          )}
        </Card.Actions>
      </Card.Header>
      <Card.Body className='stack gap-3'>
        <Progress
          value={done.length}
          max={total}
          size='sm'
          ruled
          color={finished ? 'success' : 'primary'}
          label='Tasks signed off'
          showValue={`${done.length} of ${total}`}
        />
        <Checklist
          flush
          aria-label='September month-end close'
          items={closeTasks}
          value={done}
          onChange={(next) => {
            setDone(next);
            if (next.length === total) {
              toast({
                title: 'September is closed',
                message: 'Salma Nour has been told the books are ready.',
                color: 'success',
              });
            }
          }}
        />
      </Card.Body>
    </Card>
  );
}

function UpcomingCard() {
  return (
    <Card className={s.fill}>
      <Card.Header>
        <Card.Title>Coming up</Card.Title>
        <Card.Actions>
          <span className='fs-xs text-muted'>next 7 days</span>
        </Card.Actions>
      </Card.Header>
      <Card.Body>
        <ul className={s.events}>
          {upcoming.map((e) => (
            <li key={e.title}>
              <DateTile date={e.date} size='sm' band={e.band} locale='en-GB' />
              <div className='min-w-0'>
                <p className='fw-semibold m-0'>{e.title}</p>
                <p className='fs-sm text-muted m-0'>{e.meta}</p>
                <AvatarList stacked size='sm' className='mt-2'>
                  {e.people.map((p) => (
                    <Avatar key={p} name={p} size='sm' circle />
                  ))}
                </AvatarList>
              </div>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
}

function ActivityCard({ feed }: { feed: Activity[] }) {
  const today = feed.filter((a) => a.day === 'today');
  const yesterday = feed.filter((a) => a.day === 'yesterday');
  const item = (a: Activity) => (
    <Timeline.Item
      key={a.id}
      time={a.time}
      color={a.color}
      hollow={a.hollow}
      title={a.title}
    >
      {a.text}
    </Timeline.Item>
  );
  return (
    <Card className={s.fill}>
      <Card.Header>
        <Card.Title>Logbook</Card.Title>
        <Card.Actions>
          <Status color='success' pulse size='sm'>
            live
          </Status>
        </Card.Actions>
      </Card.Header>
      <Card.Body>
        <Timeline ruled>
          <Timeline.Day>Today · Thu 8 Oct</Timeline.Day>
          <Timeline.Item
            time='14:00'
            hollow
            title='Courier pick-up, Giza depot'
          >
            Planned · 46 parcels for Cairo Courier Co.
          </Timeline.Item>
          {today.map(item)}
          <Timeline.Day>Yesterday · Wed 7 Oct</Timeline.Day>
          {yesterday.map(item)}
        </Timeline>
      </Card.Body>
    </Card>
  );
}

function UptimeCard() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Systems, last 30 days</Card.Title>
      </Card.Header>
      <Card.Body className='stack gap-4'>
        {systems.map((sys, i) => (
          <div key={sys.name}>
            <div className={s.sysRow}>
              <span className='fw-medium'>{sys.name}</span>
              <span className='font-mono fs-sm'>{sys.uptime}</span>
            </div>
            <Tracking
              size='sm'
              items={sys.items}
              aria-label={`${sys.name}, daily uptime`}
              startLabel={i === systems.length - 1 ? '30 days ago' : undefined}
              endLabel={i === systems.length - 1 ? 'Today' : undefined}
            />
          </div>
        ))}
      </Card.Body>
    </Card>
  );
}

function SuppliersCard() {
  return (
    <Card stacked>
      <Card.Header>
        <Card.Title>Supplier report card</Card.Title>
        <Card.Actions>
          <span className='fs-xs text-muted'>Q3</span>
        </Card.Actions>
      </Card.Header>
      <Card.Body>
        <ul className={s.grades}>
          {suppliers.map((sup) => (
            <li key={sup.name}>
              <span className='min-w-0 text-truncate'>{sup.name}</span>
              <Grade
                value={sup.grade}
                pen={sup.pen}
                size='sm'
                remark={sup.remark}
                label={`${sup.name}: ${sup.grade}`}
              />
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
}

// ---- new purchase order ----------------------------------------------------------------------

function PurchaseOrderModal({
  open,
  onClose,
  onRaised,
}: {
  open: boolean;
  onClose: () => void;
  onRaised: (entry: Activity) => void;
}) {
  const [errors, setErrors] = useState<{ supplier?: string; amount?: string }>(
    {},
  );
  const [nextNo, setNextNo] = useState(1187);
  const formRef = useRef<HTMLFormElement>(null);

  const close = () => {
    setErrors({});
    onClose();
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const supplier = String(data.get('supplier') ?? '');
    const amount = Number(data.get('amount'));
    const depot =
      DEPOT_OPTIONS.find((d) => d.value === data.get('depot'))?.label ?? '';
    const next: typeof errors = {};
    if (!supplier) next.supplier = 'Choose who the order goes to.';
    if (!(amount > 0)) next.amount = 'Enter the order value in pounds.';
    setErrors(next);
    if (next.supplier || next.amount) return;

    const no = `PO-${nextNo}`;
    const needsSignOff = amount > 50000;
    toast({
      title: `${no} raised`,
      message: `EGP ${egp(amount)} · ${supplier}${needsSignOff ? ' · sent to Mona Adel for sign-off' : ''}`,
      color: 'success',
    });
    onRaised({
      id: no,
      day: 'today',
      time: dayjs().format('HH:mm'),
      color: 'primary',
      title: `${no} raised`,
      text: `Karim Fawzy ordered from ${supplier} for ${depot} — EGP ${egp(amount)}.`,
    });
    setNextNo((n) => n + 1);
    e.currentTarget.reset();
    close();
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title='New purchase order'
      footer={
        <>
          <Button
            variant='ghost'
            onClick={() => {
              toast({
                title: 'Draft saved',
                message: 'Find it under Purchase orders → Drafts.',
              });
              close();
            }}
          >
            Save as draft
          </Button>
          <Button type='submit' form='ndx-po-form' color='primary'>
            Raise order
          </Button>
        </>
      }
    >
      <form
        id='ndx-po-form'
        ref={formRef}
        noValidate
        onSubmit={submit}
        className='stack gap-3'
      >
        <p className='text-muted fs-sm m-0'>
          Raised by Karim Fawzy · will be numbered{' '}
          <span className='font-mono'>PO-{nextNo}</span>
        </p>
        <Field label='Supplier' required error={errors.supplier}>
          <Select
            name='supplier'
            placeholder='Choose a supplier…'
            options={SUPPLIER_OPTIONS}
            defaultValue=''
          />
        </Field>
        <div className='grid cols-1 cols-sm-2 gap-3'>
          <Field label='Deliver to'>
            <Select name='depot' options={DEPOT_OPTIONS} defaultValue='giz' />
          </Field>
          <Field label='Needed by'>
            <Input name='needed' type='date' defaultValue='2026-10-15' />
          </Field>
        </div>
        <Field
          label='Order value'
          required
          error={errors.amount}
          hint='Including VAT.'
          remark='over EGP 50,000 goes to Mona for sign-off'
        >
          <Input
            name='amount'
            type='number'
            inputMode='decimal'
            min={0}
            step='0.01'
            placeholder='0.00'
            icon='EGP'
          />
        </Field>
        <Field label='Note to supplier' optional>
          <Textarea
            name='note'
            rows={2}
            placeholder='e.g. deliver to gate 3, ask for Omar Hany'
          />
        </Field>
      </form>
    </Modal>
  );
}

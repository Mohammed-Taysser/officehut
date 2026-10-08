import {
  IconArrowRight,
  IconCalendarEvent,
  IconFileInvoice,
} from '@tabler/icons-react';
import { useEffect } from 'react';
import { Link } from 'react-router';
import {
  Avatar,
  AvatarList,
  Badge,
  Button,
  Card,
  Checklist,
  Corkboard,
  DateTile,
  Grade,
  Kbd,
  Marker,
  Pinned,
  Progress,
  Sparkline,
  Stat,
  Status,
  Sticker,
  Sticky,
  Switch,
  Tabs,
  Tracking,
} from 'officehut/react';
import { CodeBlock } from '../components/CodeBlock';
import { CopyButton } from '../components/CopyButton';
import { NAV } from '../content/nav';

const INSTALL = 'pnpm add officehut';
const CDN = `<link rel="stylesheet" href="https://unpkg.com/officehut/dist/css/officehut.min.css">
<script src="https://unpkg.com/officehut/dist/officehut.iife.js" defer></script>`;

const HTML_SNIPPET = `<div class="card">
  <div class="card-status-top bg-success"></div>
  <div class="card-body">
    <span class="eyebrow">Invoice INV-2041</span>
    <h3 class="card-title">Acme Logistics</h3>
    <span class="badge badge-success badge-stamp">Paid</span>
  </div>
</div>`;

const REACT_SNIPPET = `import { Card, Badge } from 'officehut/react';

<Card status="success">
  <Card.Body>
    <span className="eyebrow">Invoice INV-2041</span>
    <Card.Title>Acme Logistics</Card.Title>
    <Badge color="success" variant="stamp">Paid</Badge>
  </Card.Body>
</Card>`;

// ---- hero desk -------------------------------------------------------------------

function InvoicePaper() {
  return (
    <Card className='home-paper is-invoice' status='success' clipped>
      <Card.Body>
        <div className='d-flex align-items-start gap-3'>
          <div>
            <span className='eyebrow'>Invoice INV-2041</span>
            <h3 className='card-title mt-1'>Acme Logistics</h3>
            <p className='text-muted fs-sm'>Due 14 Oct · net 30</p>
          </div>
          <Badge color='success' variant='stamp' className='ms-auto' animate>
            Paid
          </Badge>
        </div>
        <table className='home-mini-table'>
          <tbody>
            <tr>
              <td>Freight, Cairo → Alexandria</td>
              <td className='tabular-nums text-end'>4,200.00</td>
            </tr>
            <tr>
              <td>Storage, 12 pallets</td>
              <td className='tabular-nums text-end'>860.00</td>
            </tr>
            <tr className='is-total'>
              <td>Total (EGP)</td>
              <td className='tabular-nums text-end'>5,060.00</td>
            </tr>
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
}

function Desk() {
  return (
    <div className='home-desk' aria-label='Sample screens built with officehut'>
      <InvoicePaper />

      <Card className='home-paper is-room' tab='Room 4B' tabColor='aurora'>
        <Card.Body>
          <div className='d-flex align-items-center gap-2 mb-2'>
            <IconCalendarEvent size={18} className='text-aurora' />
            <strong>Quarterly planning</strong>
          </div>
          <p className='text-muted fs-sm mb-3'>Thu 10:00 – 11:30 · 6 people</p>
          <div className='d-flex align-items-center'>
            <AvatarList stacked max={4} size='sm'>
              <Avatar size='sm' circle name='Mona Adel' />
              <Avatar size='sm' circle name='Karim Fawzy' />
              <Avatar size='sm' circle name='Salma Nour' />
              <Avatar size='sm' circle name='Omar Hany' />
              <Avatar size='sm' circle name='Laila Samir' />
              <Avatar size='sm' circle name='Youssef Ali' />
            </AvatarList>
            <Button size='sm' color='aurora' variant='soft' className='ms-auto'>
              Join
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Card className='home-paper is-sheet' stacked>
        <Card.Header>
          <Card.Title as='h3' className='fs-base'>
            Timesheet · week 41
          </Card.Title>
          <Badge color='warning' className='ms-auto'>
            2 days left
          </Badge>
        </Card.Header>
        <Card.Body className='p-0'>
          <div className='home-week'>
            {(
              [
                ['Sun', 8],
                ['Mon', 7.5],
                ['Tue', 8],
                ['Wed', 6],
                ['Thu', 0],
              ] as const
            ).map(([d, h]) => (
              <div key={d} className='home-day'>
                <span
                  className='home-bar'
                  style={{ height: `${(h / 8) * 100}%` }}
                />
                <span className='fs-xs text-subtle'>{d}</span>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>

      <div className='toast toast-success home-paper is-toast' role='status'>
        <IconFileInvoice className='toast-icon' />
        <div className='toast-body'>
          <p className='toast-title'>Invoice sent</p>
          <div className='toast-text'>INV-2041 is on its way to Acme.</div>
        </div>
      </div>
    </div>
  );
}

// ---- report card -------------------------------------------------------------------

const REPORT = [
  { subject: 'Size', grade: 'A', remark: '≈32 kB gz, or pick parts' },
  { subject: 'Dependencies', grade: 'A+', remark: 'none. not even Bootstrap' },
  {
    subject: 'Accessibility',
    grade: 'A',
    remark: 'axe-core runs on every test',
  },
  { subject: 'Themes', grade: 'A', remark: 'day, night shift, auto, compact' },
  {
    subject: 'Right-to-left',
    grade: 'A',
    remark: 'logical properties throughout',
  },
  { subject: 'Types', grade: 'A+', remark: 'every prop, every token' },
];

function ReportCard() {
  return (
    <div className='notebook home-report'>
      <p className='home-report-head'>
        <span className='handwriting'>Report card — autumn term</span>
        <span className='text-subtle fs-sm'>
          pupil: officehut v{__OH_VERSION__}
        </span>
      </p>
      <table className='home-report-table'>
        <caption className='visually-hidden'>officehut report card</caption>
        <tbody>
          {REPORT.map((r) => (
            <tr key={r.subject}>
              <th scope='row'>{r.subject}</th>
              <td className='home-report-grade'>
                <Grade
                  value={r.grade}
                  size='sm'
                  pen={r.grade === 'A+' ? 'green' : 'red'}
                />
              </td>
              <td className='handwriting home-report-remark'>{r.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className='home-report-sign'>
        <span className='handwriting'>
          “A tidy, considerate worker. Keep it up.”
        </span>
        <Sticker size='sm' shape='star' tilt={12}>
          ★
        </Sticker>
      </p>
    </div>
  );
}

// ---- noticeboard --------------------------------------------------------------------

const UPTIME = Array.from({ length: 30 }, (_, i) => ({
  status: (i === 11
    ? 'danger'
    : i === 19 || i === 20
      ? 'warning'
      : 'success') as 'danger' | 'warning' | 'success',
  label: `Sep ${i + 1}: ${i === 11 ? 'outage' : i === 19 || i === 20 ? 'degraded' : 'ok'}`,
}));

function Caption({ to, children }: { to: string; children: string }) {
  return (
    <Link to={to} className='home-pin-caption handwriting'>
      {children} →
    </Link>
  );
}

function Noticeboard() {
  return (
    <Corkboard className='home-board'>
      <Pinned tilt='left' className='home-pin'>
        <Card size='sm'>
          <Card.Body>
            <span className='eyebrow'>INV-0397 · Giza Catering</span>
            <p className='fw-bold fs-lg tabular-nums mt-1'>EGP 9,830.50</p>
            <div className='d-flex gap-2 mt-2'>
              <Badge color='danger' variant='stamp'>
                Overdue
              </Badge>
              <Badge color='success' variant='stamp'>
                Paid
              </Badge>
            </div>
          </Card.Body>
        </Card>
        <Caption to='/docs/components/badge'>stamps & badges</Caption>
      </Pinned>

      <Pinned pin='blue' tilt='right' className='home-pin'>
        <Card size='sm'>
          <Card.Body>
            <Progress
              value={68}
              label='Q3 travel budget'
              showValue
              ruled
              scale
            />
          </Card.Body>
        </Card>
        <Caption to='/docs/components/progress'>ruled progress</Caption>
      </Pinned>

      <Pinned pin='green' className='home-pin is-wide'>
        <Checklist
          aria-label='Month-end close'
          defaultValue={['bank']}
          items={[
            { id: 'bank', label: 'Reconcile bank account', meta: 'Mon' },
            { id: 'accrue', label: 'Accrue utilities', meta: 'Tue' },
            {
              id: 'vat',
              label: 'File VAT return',
              meta: 'yesterday',
              late: true,
            },
          ]}
        />
        <Caption to='/docs/components/checklist'>homework checklist</Caption>
      </Pinned>

      <Pinned pin='yellow' tilt='left' className='home-pin'>
        <Card size='sm'>
          <Card.Body className='d-flex align-items-center gap-3'>
            <Grade value='9/10' remark='nearly!' />
          </Card.Body>
        </Card>
        <Caption to='/docs/components/grade'>teacher's grade</Caption>
      </Pinned>

      <Pinned tilt='right' className='home-pin'>
        <Card size='sm'>
          <Card.Body className='d-flex align-items-center gap-3'>
            <DateTile date='2026-10-14T09:00:00Z' locale='en-GB' />
            <div>
              <p className='fw-medium'>Fire drill</p>
              <p className='text-subtle fs-sm'>10:30, meet at gate B</p>
            </div>
          </Card.Body>
        </Card>
        <Caption to='/docs/components/date-tile'>tear-off date</Caption>
      </Pinned>

      <Sticky color='pink' hand className='home-pin home-sticky'>
        Printer on 3rd floor is <Marker variant='circle'>fixed</Marker> — thanks
        Karim!
      </Sticky>

      <Pinned pin='blue' className='home-pin'>
        <Card size='sm'>
          <Card.Body className='stack gap-3'>
            <Switch defaultChecked>Email me approvals</Switch>
            <p className='fs-sm text-muted'>
              Press <Kbd keys={['Ctrl', 'K']} /> to search
            </p>
          </Card.Body>
        </Card>
        <Caption to='/docs/components/switch'>switches & keys</Caption>
      </Pinned>

      <Pinned pin='green' tilt='left' className='home-pin'>
        <Stat
          label='Paid this month'
          value='EGP 412k'
          delta='+12%'
          trend='up'
          sentiment='good'
          chart={
            <Sparkline
              values={[12, 18, 15, 22, 19, 27, 31]}
              color='success'
              area
              label='Last 7 weeks'
            />
          }
        />
        <Caption to='/docs/components/stat'>stats & sparklines</Caption>
      </Pinned>

      <Pinned pin='yellow' className='home-pin is-wide'>
        <Card size='sm'>
          <Card.Body>
            <div className='d-flex align-items-center gap-2 mb-2'>
              <Status color='success' pulse>
                Payroll API
              </Status>
              <span className='ms-auto text-subtle fs-sm'>99.2% · 30 days</span>
            </div>
            <Tracking items={UPTIME} size='sm' />
          </Card.Body>
        </Card>
        <Caption to='/docs/components/tracking'>uptime tracking</Caption>
      </Pinned>

      <div className='home-pin home-stickers'>
        <Sticker shape='scallop' color='success'>
          Well done
        </Sticker>
        <Sticker shape='star'>Top</Sticker>
        <Sticker color='aurora' tilt={8}>
          New hire
        </Sticker>
      </div>
    </Corkboard>
  );
}

// ---- syllabus -------------------------------------------------------------------------

const SUBJECTS: Record<string, string[]> = {
  Forms: ['Input', 'Input group', 'Checkbox & radio', 'Switch'],
  Navigation: [
    'Navbar',
    'Sidebar',
    'Breadcrumb',
    'Tabs',
    'Pagination',
    'Steps',
  ],
  Overlays: ['Dropdown', 'Modal', 'Tooltip', 'Toast'],
  Data: ['Table', 'Stat', 'Progress', 'Tracking', 'Timeline', 'Avatar'],
  Feedback: ['Alert', 'Badge', 'Status', 'Spinner', 'Skeleton', 'Empty state'],
  'Paper & school': [
    'Notebook',
    'Sticky note',
    'Marker',
    'Grade',
    'Sticker',
    'Timetable',
    'Corkboard',
    'Checklist',
    'Date tile',
    'Chalkboard',
  ],
  'Building blocks': [
    'Button',
    'Card',
    'Accordion',
    'Collapse',
    'Chip',
    'Divider',
    'Kbd',
    'Ribbon',
  ],
};

function Syllabus() {
  const all = NAV.flatMap((s) => s.items);
  const find = (title: string) => all.find((i) => i.title === title);
  return (
    <div className='home-syllabus'>
      {Object.entries(SUBJECTS).map(([subject, titles], n) => (
        <section key={subject} className='home-subject'>
          <h3 className='home-subject-title'>
            <span className='home-subject-no handwriting'>{n + 1}.</span>
            {subject}
          </h3>
          <ul className='list-unstyled'>
            {titles.map((t) => {
              const item = find(t);
              return (
                <li key={t}>
                  {item ? (
                    <Link to={item.path}>{t}</Link>
                  ) : (
                    <span className='text-subtle'>{t}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

// ---- night shift strip -------------------------------------------------------------------

function ThemePair() {
  const card = (
    <Card status='danger'>
      <Card.Body>
        <div className='d-flex align-items-center gap-2'>
          <span className='eyebrow'>Ticket OPS-311</span>
          <Badge color='danger' className='ms-auto'>
            High
          </Badge>
        </div>
        <p className='fw-medium mt-1'>Printer on 3rd floor jams</p>
        <Progress
          value={40}
          size='sm'
          className='mt-3'
          aria-label='Fix progress'
        />
        <div className='d-flex align-items-center gap-2 mt-3'>
          <Avatar size='xs' circle name='Karim Fawzy' />
          <span className='fs-sm text-muted'>Karim · 2h ago</span>
        </div>
      </Card.Body>
    </Card>
  );
  return (
    <div className='home-pair'>
      <div data-oh-theme='light' className='home-pair-side'>
        <span className='handwriting home-pair-label'>day</span>
        {card}
      </div>
      <div data-oh-theme='dark' className='home-pair-side'>
        <span className='handwriting home-pair-label'>night shift</span>
        {card}
      </div>
    </div>
  );
}

// ---- page ---------------------------------------------------------------------------------

export default function Home() {
  useEffect(() => {
    document.title = 'officehut — a paper-quiet UI kit';
  }, []);

  return (
    <div className='home'>
      <section className='home-hero container'>
        <div className='home-copy'>
          <div className='notebook notebook-holes home-page'>
            <p className='home-dateline handwriting'>lesson 1 — the basics</p>
            <h1 className='home-title'>
              <span className='notebook-margin' aria-hidden>
                1.
              </span>
              Quiet, papery UI for the screens people use all day.
            </h1>
            <p className='lead'>
              officehut is a small kit for dashboards and back-office apps —
              invoices, rotas, tickets, approvals. One stylesheet, a few
              kilobytes of optional JavaScript, and typed React components that
              render the same markup.
            </p>
            <div className='btn-list'>
              <Link to='/docs/installation' className='btn btn-dark'>
                Get started <IconArrowRight size={16} />
              </Link>
              <Link to='/examples/dashboard' className='btn btn-outline'>
                See a full dashboard
              </Link>
              <span className='handwriting text-subtle ms-2'>← start here</span>
            </div>
          </div>

          <div className='home-receipt' aria-label='Install'>
            <div className='home-receipt-row'>
              <code>$ {INSTALL}</code>
              <CopyButton text={INSTALL} />
            </div>
            <p className='home-receipt-meta font-mono'>
              CSS ≈ 32 kB gz · JS ≈ 6 kB gz · 0 dependencies
            </p>
          </div>
        </div>
        <Desk />
      </section>

      <section className='container home-section'>
        <h2 className='section-title'>On the noticeboard</h2>
        <p className='home-section-lead'>
          Everything below is the real kit, pinned up as-is. Click a caption to
          open its page.
        </p>
        <Noticeboard />
      </section>

      <section className='container home-section home-split'>
        <div>
          <h2 className='section-title'>Report card</h2>
          <ReportCard />
        </div>
        <div>
          <h2 className='section-title'>Day and night shift</h2>
          <p className='home-section-lead'>
            The same markup under <code>data-oh-theme="light"</code> and{' '}
            <code>"dark"</code>. Themes can be scoped to any element, not just
            the page.
          </p>
          <ThemePair />
        </div>
      </section>

      <section className='container home-section'>
        <h2 className='section-title'>Two ways in, same markup</h2>
        <div className='home-ways'>
          <div className='home-way'>
            <h3 className='h4'>Plain HTML</h3>
            <p className='text-muted mb-3'>
              Drop in the stylesheet and script. Classes do the styling;{' '}
              <code>data-oh-*</code> attributes wire up dropdowns, modals and
              tabs.
            </p>
            <CodeBlock code={CDN} lang='html' label='<head>' />
            <CodeBlock
              code={HTML_SNIPPET}
              lang='html'
              label='index.html'
              className='mt-3'
            />
          </div>
          <div className='home-way'>
            <h3 className='h4'>React</h3>
            <p className='text-muted mb-3'>
              Typed components with the same class names underneath — what you
              learn in one carries to the other.
            </p>
            <Tabs defaultValue='tsx'>
              <Tabs.List variant='folder' aria-label='React example'>
                <Tabs.Tab value='tsx'>Invoice.tsx</Tabs.Tab>
                <Tabs.Tab value='install'>Setup</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value='tsx' className='home-way-panel'>
                <CodeBlock
                  code={REACT_SNIPPET}
                  lang='tsx'
                  label='Invoice.tsx'
                />
              </Tabs.Panel>
              <Tabs.Panel value='install' className='home-way-panel'>
                <CodeBlock
                  code={`pnpm add officehut\n\n// main.tsx\nimport 'officehut/css';`}
                  lang='tsx'
                  label='main.tsx'
                />
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
      </section>

      <section className='container home-section'>
        <h2 className='section-title'>The syllabus</h2>
        <Syllabus />
      </section>

      <section className='container home-section home-homework'>
        <div>
          <h2 className='section-title'>Homework</h2>
          <p className='home-section-lead'>
            Three things, about ten minutes. Tick them off as you go.
          </p>
          <Checklist
            aria-label='Get started'
            items={[
              {
                id: 'install',
                label: (
                  <>
                    Install: <code>pnpm add officehut</code>
                  </>
                ),
                meta: '1 min',
              },
              {
                id: 'css',
                label: (
                  <>
                    Import <code>officehut/css</code> once in your entry file
                  </>
                ),
                meta: '1 min',
              },
              {
                id: 'build',
                label: (
                  <>
                    Copy a card from the{' '}
                    <Link to='/docs/components/card'>Card page</Link>
                  </>
                ),
                meta: '5 min',
              },
            ]}
          />
        </div>
        <Sticky color='yellow' hand taped className='home-homework-note'>
          <p className='sticky-title'>Stuck?</p>
          Every page has the HTML, React and plain JS for each example — and a{' '}
          <Marker>switchboard</Marker> to try props live.
        </Sticky>
      </section>

      <footer className='container home-footer'>
        <p>
          MIT licensed. Borrowing good ideas from{' '}
          <a href='https://tabler.io'>Tabler</a> and{' '}
          <a href='https://picturepan2.github.io/spectre/'>Spectre.css</a>.
        </p>
      </footer>
    </div>
  );
}

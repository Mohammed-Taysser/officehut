import { IconPrinter } from '@tabler/icons-react';
import { useState } from 'react';
import {
  Badge,
  Button,
  DateTile,
  MarginNote,
  Notebook,
  Table,
  Tabs,
} from 'officehut/react';
import { DocPage } from '../../components/DocPage';
import { Note } from '../../components/Note';
import { TODAY, egp } from './dashboard-data';
import s from './invoice.module.scss';

type State = 'paid' | 'overdue';

// Local noon: the same calendar day in every time zone.
const ISSUED = new Date(2026, 8, 1, 12);
const DUE = new Date(2026, 9, 1, 12);
const DAYS_LATE = Math.round((TODAY.getTime() - DUE.getTime()) / 86_400_000);

const LINES = [
  {
    item: 'A4 copier paper, 80 gsm',
    detail: 'Box of 5 reams · Pharaoh Paper Mills',
    qty: 40,
    unit: 'box',
    price: 1150,
  },
  {
    item: 'Toner cartridge, 26A compatible',
    detail: 'Black · 3,100 pages',
    qty: 12,
    unit: 'pc',
    price: 2350,
  },
  {
    item: 'Archive box files, foolscap',
    detail: 'Grey board, lever arch',
    qty: 120,
    unit: 'pc',
    price: 38.5,
  },
  {
    item: 'Office chair, mesh back',
    detail: 'Adjustable arms · 2-year warranty',
    qty: 6,
    unit: 'pc',
    price: 4800,
  },
  {
    item: 'Thermal labels 100 × 150 mm',
    detail: 'Roll of 500',
    qty: 30,
    unit: 'roll',
    price: 185,
  },
  {
    item: 'Delivery and unloading',
    detail: 'Cairo → Alexandria, one 3.5 t truck · DN-58210',
    qty: 1,
    unit: 'trip',
    price: 3200,
  },
];

const SUBTOTAL = LINES.reduce((sum, l) => sum + l.qty * l.price, 0);
const VAT = Math.round(SUBTOTAL * 0.14 * 100) / 100;
const TOTAL = SUBTOTAL + VAT;

export default function InvoicePage() {
  const [state, setState] = useState<State>('overdue');

  return (
    <DocPage
      title='Printable invoice'
      lead='An A4 tax invoice from Nile & Delta Supplies, laid out as a page torn from a ruled account book. Switch the stamp, then print it: the docs around it drop away and the sheet fills one page.'
    >
      <Tabs
        value={state}
        defaultValue='overdue'
        onChange={(v) => setState(v as State)}
      >
        <div className={s.controls}>
          <Tabs.List variant='segmented' aria-label='Invoice state'>
            <Tabs.Tab value='overdue'>Overdue</Tabs.Tab>
            <Tabs.Tab value='paid'>Paid</Tabs.Tab>
          </Tabs.List>
          <span className={`handwriting ${s.hint}`}>fits one A4 sheet</span>
          <Button
            color='primary'
            icon={<IconPrinter />}
            onClick={() => window.print()}
          >
            Print
          </Button>
        </div>

        {(['overdue', 'paid'] as const).map((st) => (
          <Tabs.Panel key={st} value={st} className={s.panel}>
            <Sheet state={st} />
          </Tabs.Panel>
        ))}
      </Tabs>

      <div className={s.screenOnly}>
        <Note title='How it prints'>
          A print stylesheet scoped to this page hides the top bar, the sidebar
          and these controls, removes the shadows and tilts, and keeps the stamp
          and the calendar bands in colour.
        </Note>
      </div>
    </DocPage>
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
      className={s.logo}
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
        d='M6.5 10c1.8-1.8 3.7 1.8 5.5 0s3.7 1.8 5.5 0M6.5 15c1.8-1.8 3.7 1.8 5.5 0s3.7 1.8 5.5 0'
        className={s.logoWave}
      />
    </svg>
  );
}

function Sheet({ state }: { state: State }) {
  const paid = state === 'paid';

  return (
    <article className={s.sheet} aria-label='Tax invoice INV-2026-0418'>
      <header className={s.letterhead}>
        <div className={s.brand}>
          <Logo />
          <div>
            <p className={s.company}>Nile &amp; Delta Supplies</p>
            <p className={s.tagline}>
              Office supplies · warehousing · delivery
            </p>
          </div>
        </div>
        <address className={s.from}>
          14 El-Nasr Road, Nasr City
          <br />
          Cairo 11765, Egypt
          <br />
          +20 2 2405 1180
          <br />
          Tax reg. 512-338-907 · C.R. 104417
        </address>
      </header>

      <div className={s.titleRow}>
        <div>
          <h2 className={s.title}>Tax invoice</h2>
          <p className={s.number}>
            No. <span className='font-mono'>INV-2026-0418</span>
          </p>
        </div>
        <Badge
          key={state}
          variant='stamp'
          color={paid ? 'success' : 'danger'}
          animate
          className={s.stamp}
        >
          {paid ? 'Paid' : 'Overdue'}
          <span className={s.stampSub}>
            {paid ? '29 Sep 2026 · CIB' : `${DAYS_LATE} days · 2nd notice`}
          </span>
        </Badge>
      </div>

      <div className={s.parties}>
        <section>
          <h3 className={s.label}>Bill to</h3>
          <p>
            <strong>Corniche Medical Centres</strong>
            <br />
            Attn. Laila Samir, Procurement
            <br />
            27 Fouad Street, Raml Station
            <br />
            Alexandria 21131
            <br />
            Tax reg. 287-104-552
          </p>
        </section>
        <section>
          <h3 className={s.label}>Ship to</h3>
          <p>
            <strong>Corniche Medical — Smouha store</strong>
            <br />
            Gate 2, 9 Victor Emmanuel Square
            <br />
            Smouha, Alexandria
            <br />
            Receiving desk, 08:00–15:00
          </p>
        </section>
        <section className={s.meta}>
          <div className={s.dates}>
            <div>
              <DateTile date={ISSUED} size='sm' band='blue' locale='en-GB' />
              <span>Issued</span>
            </div>
            <div>
              <DateTile
                date={DUE}
                size='sm'
                band={paid ? 'green' : 'red'}
                locale='en-GB'
              />
              <span>Due</span>
            </div>
          </div>
          <dl>
            <dt>Your order</dt>
            <dd className='font-mono'>CMC-7741</dd>
            <dt>Terms</dt>
            <dd>Net 30 days</dd>
            <dt>Currency</dt>
            <dd>Egyptian pound</dd>
          </dl>
        </section>
      </div>

      <Table ledger responsive className={s.lines}>
        <caption className='visually-hidden'>Invoice lines</caption>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Description</th>
            <th scope='col' className='num'>
              Qty
            </th>
            <th scope='col' className='num'>
              Unit price
            </th>
            <th scope='col' className='num'>
              Amount, EGP
            </th>
          </tr>
        </thead>
        <tbody>
          {LINES.map((l, i) => (
            <tr key={l.item}>
              <td className={s.lineNo}>{i + 1}</td>
              <td>
                <span className={s.item}>{l.item}</span>
                <span className={s.detail}>{l.detail}</span>
              </td>
              <td className='num'>
                {l.qty} <span className={s.unit}>{l.unit}</span>
              </td>
              <td className='num'>{egp(l.price)}</td>
              <td className='num'>{egp(l.qty * l.price)}</td>
            </tr>
          ))}
          <tr className={s.sumRow}>
            <td />
            <th scope='row' colSpan={3}>
              Subtotal
            </th>
            <td className='num'>{egp(SUBTOTAL)}</td>
          </tr>
          <tr className={s.sumRow}>
            <td />
            <th scope='row' colSpan={3}>
              VAT 14%
            </th>
            <td className='num'>{egp(VAT)}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr className={s.totalRow}>
            <td />
            <th scope='row' colSpan={3}>
              Total, EGP
            </th>
            <td className='num'>{egp(TOTAL)}</td>
          </tr>
        </tfoot>
      </Table>

      <p className={s.words}>
        <span>In words:</span> one hundred and thirty-two thousand, six hundred
        and sixty-one Egyptian pounds and eighty piastres.
      </p>

      <div className={s.bottom}>
        <section className={s.pay}>
          <h3 className={s.label}>Pay by bank transfer</h3>
          <dl>
            <dt>Bank</dt>
            <dd>CIB, Nasr City branch</dd>
            <dt>Account</dt>
            <dd>Nile &amp; Delta Supplies S.A.E.</dd>
            <dt>IBAN</dt>
            <dd className='font-mono'>EG38 0010 0123 0000 0001 2345 6789 0</dd>
            <dt>Reference</dt>
            <dd className='font-mono'>INV-2026-0418</dd>
          </dl>
          <p className={s.balance}>
            {paid ? (
              <>
                Balance <strong>EGP 0.00</strong> — paid in full, transfer ref.
                77120
              </>
            ) : (
              <>
                Balance due <strong>EGP {egp(TOTAL)}</strong> — {DAYS_LATE} days
                past the due date
              </>
            )}
          </p>
        </section>

        <Notebook className={s.notes}>
          <p className={s.notesTitle}>
            <MarginNote>NB</MarginNote>
            Notes
          </p>
          <p className={`handwriting ${s.noteText}`}>
            {paid
              ? 'Received with thanks, 29 Sep. Next order ships on the usual Tuesday run.'
              : 'Second reminder sent 5 Oct. Please settle by 12 Oct to keep deliveries running.'}
          </p>
        </Notebook>
      </div>

      <footer className={s.signoff}>
        <div className={s.sign}>
          <span className={s.signature}>Salma Nour</span>
          <span className={s.signCaption}>
            Salma Nour · Accounts receivable
          </span>
        </div>
        <div className={s.sign}>
          <span className={s.signature} aria-hidden />
          <span className={s.signCaption}>
            Received by — name, signature, date
          </span>
        </div>
      </footer>

      <p className={s.small}>
        Goods remain the property of Nile &amp; Delta Supplies until paid in
        full. Late payments accrue 1.5% a month. Questions about this invoice:
        Salma Nour, +20 2 2405 1180 ext. 214.
        <span className={s.pageNo}>Page 1 of 1</span>
      </p>
    </article>
  );
}

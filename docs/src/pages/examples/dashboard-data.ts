// Sample data for the Dashboard example: Nile & Delta Supplies, week 41 of 2026.
import type { Color, TrackingItem } from 'officehut/react';

/** "Today" inside the example, so the page reads the same whenever it is opened. */
export const TODAY = new Date(2026, 9, 8, 12);

export const egp = (n: number, digits = 2) =>
  n.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

// ---- KPIs ---------------------------------------------------------------------------
export const revenueWeeks = [318, 342, 305, 356, 371, 388, 381, 413];
export const dispatchedWeeks = [1102, 1148, 1096, 1187, 1203, 1251, 1210, 1284];
export const onTimeWeeks = [96.1, 95.4, 96.8, 95.9, 95.2, 96.0, 95.5, 94.2];
export const overdueWeeks = [96, 104, 121, 118, 147, 162, 188, 212];

// ---- cash flow (EGP thousands) -------------------------------------------------------
const cashIn = [298, 315, 287, 342, 330, 356, 318, 371, 388, 362, 381, 413];
const cashOut = [262, 281, 299, 275, 312, 296, 334, 301, 322, 347, 318, 336];
export const cashFlow = cashIn.map((collected, i) => ({
  week: `W${30 + i}`,
  collected,
  paidOut: cashOut[i] ?? 0,
}));

/** Q3 (Jul–Sep) revenue per depot, EGP thousands. */
export const revenueByDepot = [
  { depot: 'Cairo', revenue: 1842 },
  { depot: 'Alexandria', revenue: 1126 },
  { depot: 'Giza', revenue: 964 },
  { depot: 'Tanta', revenue: 412 },
];

// ---- invoices -----------------------------------------------------------------------
export type InvoiceStatus = 'paid' | 'overdue' | 'sent' | 'draft';

export interface Invoice {
  no: string;
  client: string;
  city: string;
  issued: string;
  due: string;
  amount: number;
  status: InvoiceStatus;
}

export const STATUS: Record<InvoiceStatus, { label: string; color: Color }> = {
  paid: { label: 'Paid', color: 'success' },
  overdue: { label: 'Overdue', color: 'danger' },
  sent: { label: 'Sent', color: 'info' },
  draft: { label: 'Draft', color: 'secondary' },
};

export const invoices: Invoice[] = [
  {
    no: 'INV-2026-0433',
    client: 'Agouza Print House',
    city: 'Giza',
    issued: '2026-10-07',
    due: '2026-11-06',
    amount: 8415,
    status: 'draft',
  },
  {
    no: 'INV-2026-0431',
    client: 'Corniche Medical Centres',
    city: 'Alexandria',
    issued: '2026-10-05',
    due: '2026-11-04',
    amount: 58240,
    status: 'draft',
  },
  {
    no: 'INV-2026-0428',
    client: 'Heliopolis Dental Group',
    city: 'Cairo',
    issued: '2026-10-01',
    due: '2026-10-31',
    amount: 21380,
    status: 'sent',
  },
  {
    no: 'INV-2026-0425',
    client: 'Giza Plateau Hotel',
    city: 'Giza',
    issued: '2026-09-28',
    due: '2026-10-28',
    amount: 74115.6,
    status: 'sent',
  },
  {
    no: 'INV-2026-0422',
    client: 'Tanta University Hospital',
    city: 'Tanta',
    issued: '2026-09-22',
    due: '2026-10-22',
    amount: 33900,
    status: 'paid',
  },
  {
    no: 'INV-2026-0418',
    client: 'Corniche Medical Centres',
    city: 'Alexandria',
    issued: '2026-09-01',
    due: '2026-10-01',
    amount: 132661.8,
    status: 'overdue',
  },
  {
    no: 'INV-2026-0415',
    client: 'Maadi Language School',
    city: 'Cairo',
    issued: '2026-08-29',
    due: '2026-09-28',
    amount: 18450,
    status: 'overdue',
  },
  {
    no: 'INV-2026-0412',
    client: 'Smart Village Offices',
    city: 'Giza',
    issued: '2026-08-25',
    due: '2026-09-24',
    amount: 46780.25,
    status: 'paid',
  },
  {
    no: 'INV-2026-0409',
    client: 'Montaza Sea Club',
    city: 'Alexandria',
    issued: '2026-08-20',
    due: '2026-09-19',
    amount: 9870,
    status: 'paid',
  },
  {
    no: 'INV-2026-0406',
    client: 'New Cairo Co-working',
    city: 'Cairo',
    issued: '2026-08-18',
    due: '2026-09-17',
    amount: 27300,
    status: 'paid',
  },
  {
    no: 'INV-2026-0403',
    client: 'Delta Textile Mills',
    city: 'Mahalla',
    issued: '2026-08-14',
    due: '2026-09-13',
    amount: 61045,
    status: 'overdue',
  },
  {
    no: 'INV-2026-0400',
    client: 'Zamalek Law Chambers',
    city: 'Cairo',
    issued: '2026-08-10',
    due: '2026-09-09',
    amount: 12960.5,
    status: 'paid',
  },
  {
    no: 'INV-2026-0397',
    client: 'Sheikh Zayed Clinic',
    city: 'Giza',
    issued: '2026-08-07',
    due: '2026-09-06',
    amount: 15620,
    status: 'paid',
  },
];

export const overdueTotal = invoices
  .filter((i) => i.status === 'overdue')
  .reduce((s, i) => s + i.amount, 0);

// ---- month-end close ------------------------------------------------------------------
export const closeTasks = [
  {
    id: 'bank',
    label: 'Bank reconciliation — CIB and NBE accounts',
    meta: 'Salma · 5 Oct',
  },
  { id: 'payroll', label: 'Payroll journal posted', meta: 'Laila · 6 Oct' },
  {
    id: 'freight',
    label: 'Accrue September freight, Nile Freight Lines',
    meta: 'Omar · Thu',
  },
  {
    id: 'stock',
    label: 'Stock count sign-off, Alexandria depot',
    meta: 'Youssef · 2 days late',
    late: true,
  },
  {
    id: 'assets',
    label: 'Asset register: add two forklifts (Giza)',
    meta: 'Karim · Mon',
  },
  {
    id: 'vat',
    label: 'Draft VAT return for September',
    meta: 'Salma · 15 Oct',
  },
];

// ---- standup, calendar, activity -------------------------------------------------------
export const standup = [
  {
    who: 'Youssef',
    what: 'Alexandria port — 3 containers held for inspection',
  },
  { who: 'Omar', what: 'Giza forklift #2 back from service, rota restored' },
  { who: 'Salma', what: 'Call Corniche Medical about 0418 before noon' },
  { who: 'Laila', what: 'Friday half-day rota — two drivers short' },
];

export const upcoming = [
  {
    date: new Date(2026, 9, 9, 12),
    title: 'Customs inspection',
    meta: 'Alexandria port · 10:00',
    people: ['Youssef Ali', 'Omar Hany'],
    band: 'blue' as const,
  },
  {
    date: new Date(2026, 9, 12, 12),
    title: 'Quarterly review — Corniche Medical',
    meta: 'Smouha office · 13:30',
    people: ['Mona Adel', 'Karim Fawzy', 'Salma Nour'],
    band: 'red' as const,
  },
  {
    date: new Date(2026, 9, 15, 12),
    title: 'VAT return due',
    meta: 'Tax portal · end of day',
    people: ['Salma Nour'],
    band: 'dark' as const,
  },
];

export interface Activity {
  id: string;
  time: string;
  day: 'today' | 'yesterday';
  color?: Color;
  hollow?: boolean;
  title: string;
  text: string;
}

export const activity: Activity[] = [
  {
    id: 'a1',
    day: 'today',
    time: '09:52',
    color: 'success',
    title: 'INV-2026-0422 paid',
    text: 'EGP 33,900.00 from Tanta University Hospital — matched by Salma Nour.',
  },
  {
    id: 'a2',
    day: 'today',
    time: '09:31',
    color: 'warning',
    title: 'Containers held at Alexandria port',
    text: 'Youssef Ali: three containers flagged for inspection, release expected Saturday.',
  },
  {
    id: 'a3',
    day: 'today',
    time: '08:47',
    title: 'PO-1186 raised',
    text: 'Omar Hany ordered 400 boxes of A4 paper for the Giza depot.',
  },
  {
    id: 'a4',
    day: 'today',
    time: '07:05',
    title: 'Night shift handed over',
    text: 'Laila Samir: 212 orders dispatched, no incidents.',
  },
  {
    id: 'a5',
    day: 'yesterday',
    time: '17:40',
    title: 'Overtime approved',
    text: 'Karim Fawzy approved Saturday overtime for the Alexandria depot.',
  },
  {
    id: 'a6',
    day: 'yesterday',
    time: '16:05',
    color: 'danger',
    title: 'Second reminder sent',
    text: 'INV-2026-0418 to Corniche Medical Centres, now 6 days overdue.',
  },
];

// ---- uptime (last 30 days) --------------------------------------------------------------
const DAY = 24 * 60 * 60 * 1000;
const dayLabel = (i: number) =>
  new Date(TODAY.getTime() - (29 - i) * DAY).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

function strip(incidents: Record<number, [Color, string]>): TrackingItem[] {
  return Array.from({ length: 30 }, (_, i) => {
    const hit = incidents[i];
    return hit
      ? { status: hit[0], label: `${dayLabel(i)} — ${hit[1]}` }
      : { status: 'success' as const, label: `${dayLabel(i)} — 100% uptime` };
  });
}

export const systems = [
  {
    name: 'Warehouse system',
    uptime: '99.92%',
    items: strip({
      11: ['warning', '99.1%, slow sync at 02:00'],
      26: ['warning', '99.6%, planned update'],
    }),
  },
  {
    name: 'Courier booking API',
    uptime: '99.71%',
    items: strip({
      4: ['danger', '94.8%, provider outage 41 min'],
      17: ['warning', '99.3%, timeouts'],
      28: ['warning', '99.4%, timeouts'],
    }),
  },
  {
    name: 'Scanners · Giza depot',
    uptime: '99.98%',
    items: strip({ 20: ['warning', '99.7%, Wi-Fi access point swapped'] }),
  },
];

export const suppliers = [
  {
    name: 'Nile Freight Lines',
    grade: 'A-',
    pen: 'green' as const,
    remark: 'on time 9 of 10',
  },
  {
    name: 'Delta Packaging Co.',
    grade: 'B+',
    pen: 'blue' as const,
    remark: 'short twice',
  },
  {
    name: 'Cairo Courier Co.',
    grade: 'C',
    pen: 'red' as const,
    remark: 'review contract',
  },
];

export const SUPPLIER_OPTIONS = [
  'Delta Packaging Co.',
  'Nile Freight Lines',
  'Pharaoh Paper Mills',
  'Cairo Courier Co.',
  'Sinai Office Furniture',
];
export const DEPOT_OPTIONS = [
  { value: 'cai', label: 'Cairo — Nasr City' },
  { value: 'alx', label: 'Alexandria — Moharram Bey' },
  { value: 'giz', label: 'Giza — 6th of October' },
  { value: 'tnt', label: 'Tanta — Gharbia' },
];

/**
 * Single source of truth for the docs sidebar, routes and prev/next links.
 * `page` is a file under `docs/src/pages` (without extension).
 */
export interface NavItem {
  title: string;
  path: string;
  page: string;
  status?: 'new' | 'beta';
  /** Extra words for the quick-find box. */
  keywords?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

const c = (
  title: string,
  slug: string,
  extra: Partial<NavItem> = {},
): NavItem => ({
  title,
  path: `/docs/components/${slug}`,
  page: `components/${title.replace(/(^|[^A-Za-z]+)([a-z])/g, (_, __, ch: string) => ch.toUpperCase()).replace(/[^A-Za-z]/g, '')}`,
  ...extra,
});

export const NAV: NavSection[] = [
  {
    title: 'Start here',
    items: [
      { title: 'Introduction', path: '/docs', page: 'guide/Introduction' },
      {
        title: 'Installation',
        path: '/docs/installation',
        page: 'guide/Installation',
        keywords: 'cdn npm sass setup',
      },
      {
        title: 'Theming & tokens',
        path: '/docs/theming',
        page: 'guide/Theming',
        keywords: 'colors variables css custom properties sass config',
      },
      {
        title: 'Dark mode & density',
        path: '/docs/dark-mode',
        page: 'guide/DarkMode',
        keywords: 'night theme compact',
      },
      {
        title: 'Right-to-left',
        path: '/docs/rtl',
        page: 'guide/Rtl',
        keywords: 'arabic rtl direction',
      },
      {
        title: 'Accessibility',
        path: '/docs/accessibility',
        page: 'guide/Accessibility',
        keywords: 'a11y aria keyboard',
      },
      {
        title: 'Vanilla JS API',
        path: '/docs/javascript',
        page: 'guide/Javascript',
        keywords: 'data attributes events initAll',
      },
      {
        title: 'Browser support',
        path: '/docs/browser-support',
        page: 'guide/BrowserSupport',
      },
    ],
  },
  {
    title: 'Layout',
    items: [
      {
        title: 'Typography',
        path: '/docs/layout/typography',
        page: 'layout/Typography',
        keywords: 'headings text code',
      },
      {
        title: 'Grid & stacks',
        path: '/docs/layout/grid',
        page: 'layout/Grid',
        keywords: 'row col columns gap',
      },
      {
        title: 'App shell',
        path: '/docs/layout/shell',
        page: 'layout/Shell',
        keywords: 'page header sidebar navbar',
      },
      {
        title: 'Utilities',
        path: '/docs/layout/utilities',
        page: 'layout/Utilities',
        keywords: 'spacing margin padding display flex',
      },
    ],
  },
  {
    title: 'Components',
    items: [
      c('Accordion', 'accordion'),
      c('Alert', 'alert'),
      c('Avatar', 'avatar'),
      c('Badge', 'badge', { keywords: 'stamp label tag' }),
      c('Breadcrumb', 'breadcrumb'),
      c('Button', 'button'),
      c('Card', 'card', { keywords: 'folder tab stacked paper' }),
      c('Checkbox & radio', 'checkbox', { status: 'new' }),
      c('Chip', 'chip', { status: 'new', keywords: 'tag filter token' }),
      c('Collapse', 'collapse'),
      c('Divider', 'divider', { status: 'new' }),
      c('Dropdown', 'dropdown', { keywords: 'menu' }),
      c('Empty state', 'empty-state', { status: 'new' }),
      c('Input', 'input', {
        status: 'new',
        keywords: 'form field textarea select label',
      }),
      c('Input group', 'input-group', { status: 'new' }),
      c('Kbd', 'kbd', { status: 'new', keywords: 'keyboard shortcut' }),
      c('Modal', 'modal', { keywords: 'dialog drawer offcanvas' }),
      c('Navbar', 'navbar', { status: 'new' }),
      c('Pagination', 'pagination', { status: 'new' }),
      c('Progress', 'progress', { status: 'new', keywords: 'meter bar' }),
      c('Ribbon', 'ribbon', { status: 'new' }),
      c('Sidebar', 'sidebar', { status: 'new', keywords: 'nav menu' }),
      c('Skeleton', 'skeleton', {
        status: 'new',
        keywords: 'placeholder loading',
      }),
      c('Spinner', 'spinner', { status: 'new', keywords: 'loader loading' }),
      c('Stat', 'stat', { status: 'new', keywords: 'kpi metric number' }),
      c('Status', 'status', { status: 'new', keywords: 'dot indicator' }),
      c('Steps', 'steps', { status: 'new', keywords: 'wizard stepper' }),
      c('Switch', 'switch', { status: 'new', keywords: 'toggle' }),
      c('Table', 'table', { status: 'new', keywords: 'data grid' }),
      c('Tabs', 'tabs', { keywords: 'folder segmented' }),
      c('Timeline', 'timeline', { status: 'new', keywords: 'activity feed' }),
      c('Toast', 'toast', { keywords: 'notification snackbar' }),
      c('Tooltip', 'tooltip'),
      c('Tracking', 'tracking', { status: 'new', keywords: 'uptime heatmap' }),
    ],
  },
  {
    title: 'Paper & school',
    items: [
      c('Notebook', 'notebook', {
        keywords: 'ruled lined paper school exercise book handwriting',
      }),
      c('Sticky note', 'sticky-note', {
        status: 'new',
        keywords: 'post-it memo',
      }),
      c('Marker', 'marker', {
        status: 'new',
        keywords: 'highlight underline circle strike pen',
      }),
      c('Grade', 'grade', {
        status: 'new',
        keywords: 'score rating mark teacher',
      }),
      c('Sticker', 'sticker', { status: 'new', keywords: 'gold star reward' }),
      c('Timetable', 'timetable', {
        status: 'new',
        keywords: 'rota schedule shifts calendar week',
      }),
      c('Corkboard', 'corkboard', {
        status: 'new',
        keywords: 'noticeboard pin paper clip',
      }),
      c('Checklist', 'checklist', {
        status: 'new',
        keywords: 'todo tasks homework',
      }),
      c('Date tile', 'date-tile', { status: 'new', keywords: 'calendar day' }),
      c('Chalkboard', 'chalkboard', {
        status: 'new',
        keywords: 'blackboard announcement code',
      }),
      c('Binder tabs', 'binder', {
        status: 'new',
        keywords: 'index dividers tabs',
      }),
      c('Pencil loader', 'pencil-loader', {
        status: 'new',
        keywords: 'loading spinner',
      }),
      c('Error sheet', 'error-sheet', {
        status: 'new',
        keywords: 'error boundary crash',
      }),
    ],
  },
  {
    title: 'Examples',
    items: [
      {
        title: 'Dashboard',
        path: '/examples/dashboard',
        page: 'examples/Dashboard',
      },
      {
        title: 'Printable invoice',
        path: '/examples/invoice',
        page: 'examples/Invoice',
        keywords: 'print',
      },
    ],
  },
];

export const FLAT_NAV: NavItem[] = NAV.flatMap((s) => s.items);

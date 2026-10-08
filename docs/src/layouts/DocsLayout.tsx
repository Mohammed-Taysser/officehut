import { IconMenu2, IconSearch } from '@tabler/icons-react';
import { useLayoutEffect, useRef, useState, type RefObject } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import { Modal } from 'officehut/react';
import { NAV } from '../content/nav';
import { RouteFallback } from '../components/RouteFallback';
import { Suspense } from 'react';

function SideNav({
  query,
  onNavigate,
}: {
  query: string;
  onNavigate?: () => void;
}) {
  const q = query.trim().toLowerCase();
  const sections = NAV.map((s) => ({
    ...s,
    items: s.items.filter(
      (i) => !q || `${i.title} ${i.keywords ?? ''}`.toLowerCase().includes(q),
    ),
  })).filter((s) => s.items.length);

  return (
    <nav aria-label='Documentation' className='doc-sidenav'>
      {sections.map((section) => (
        <div key={section.title} className='doc-sidenav-section'>
          <p className='doc-sidenav-title'>{section.title}</p>
          <ul>
            {section.items.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} end onClick={onNavigate}>
                  {item.title}
                  {item.status === 'new' && (
                    <span className='doc-dot' aria-label='new' />
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {sections.length === 0 && (
        <p className='text-subtle px-3'>Nothing filed under “{query}”.</p>
      )}
    </nav>
  );
}

function Finder({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className='doc-finder'>
      <IconSearch size={15} aria-hidden />
      <span className='visually-hidden'>Filter pages</span>
      <input
        type='search'
        placeholder='Find a page…'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

/**
 * Keep the current page's link visible in a scrollable sidebar: on first load
 * and whenever the route changes. Only the sidebar scrolls — never the page.
 */
function useRevealActive(
  container: RefObject<HTMLElement | null>,
  pathname: string,
) {
  useLayoutEffect(() => {
    const box = container.current;
    const link = box?.querySelector<HTMLElement>('a.active');
    if (!box || !link) return;
    const boxRect = box.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const above = linkRect.top < boxRect.top + 48;
    const below = linkRect.bottom > boxRect.bottom - 24;
    if (!above && !below) return;
    // Centre it, so the neighbouring pages are visible too.
    box.scrollTo({
      top:
        box.scrollTop +
        linkRect.top -
        boxRect.top -
        box.clientHeight / 2 +
        linkRect.height / 2,
    });
  }, [container, pathname]);
}

export function DocsLayout() {
  const [query, setQuery] = useState('');
  const [drawer, setDrawer] = useState(false);
  const sidebar = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  useRevealActive(sidebar, pathname);

  return (
    <div className='doc-shell'>
      <aside className='doc-sidebar' ref={sidebar}>
        <Finder value={query} onChange={setQuery} />
        <SideNav query={query} />
      </aside>

      <button
        type='button'
        className='btn btn-sm doc-menu-btn'
        onClick={() => setDrawer(true)}
      >
        <IconMenu2 size={16} /> Menu
      </button>
      <Modal
        open={drawer}
        onClose={() => setDrawer(false)}
        drawer
        title='officehut docs'
        size='sm'
      >
        <Finder value={query} onChange={setQuery} />
        <SideNav query={query} onNavigate={() => setDrawer(false)} />
      </Modal>

      <div className='doc-content'>
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

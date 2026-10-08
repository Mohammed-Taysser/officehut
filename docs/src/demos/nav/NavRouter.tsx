import type { ComponentPropsWithRef } from 'react';
import { Link, useLocation } from 'react-router';
import { Nav, type NavEntry } from 'officehut/react';

// `linkAs` receives `href`; map it to whatever your router expects.
function RouterLink({ href = '', ...rest }: ComponentPropsWithRef<'a'>) {
  return <Link to={href} {...rest} />;
}

const items: NavEntry[] = [
  { heading: 'Navigation pages' },
  { label: 'Navbar', href: '/docs/components/navbar' },
  { label: 'Sidebar', href: '/docs/components/sidebar' },
  { label: 'Pagination', href: '/docs/components/pagination' },
  { label: 'Steps', href: '/docs/components/steps' },
  { label: 'App shell', href: '/docs/layout/shell' },
];

export default function NavRouter() {
  const { pathname } = useLocation();
  return (
    <div style={{ maxWidth: 260 }}>
      <Nav
        items={items}
        currentHref={pathname}
        linkAs={RouterLink}
        label='Docs'
      />
    </div>
  );
}

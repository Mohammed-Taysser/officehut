import type { ComponentProps } from 'react';
import { Link } from 'react-router';
import { Breadcrumb } from 'officehut/react';

// Breadcrumb passes `href`; a router Link wants `to`. A tiny adapter bridges them.
function RouterLink({ href = '', ...rest }: ComponentProps<'a'>) {
  return <Link to={href} {...rest} />;
}

export default function RouterLinks() {
  return (
    <Breadcrumb
      linkAs={RouterLink}
      items={[
        { label: 'Docs', href: '/docs' },
        { label: 'Components', href: '/docs/components/button' },
        { label: 'Breadcrumb' },
      ]}
    />
  );
}

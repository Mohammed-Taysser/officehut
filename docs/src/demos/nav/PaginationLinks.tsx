import type { ComponentPropsWithRef } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Pagination } from 'officehut/react';

function RouterLink({ href = '', ...rest }: ComponentPropsWithRef<'a'>) {
  return <Link to={href} preventScrollReset {...rest} />;
}

// The page lives in the URL (?vendors=4), so back/forward and shared links work.
export default function PaginationLinks() {
  const [params] = useSearchParams();
  const page = Number(params.get('vendors')) || 1;

  return (
    <Pagination
      total={15}
      page={page}
      getHref={(n) => `?vendors=${n}`}
      linkAs={RouterLink}
      label='Vendor pages'
    />
  );
}

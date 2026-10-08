import { useLocation } from 'react-router';
import { FLAT_NAV } from '../content/nav';
import { DocPage } from '../components/DocPage';

/** Placeholder for pages listed in the nav that haven't been written yet. */
export default function Missing() {
  const { pathname } = useLocation();
  const item = FLAT_NAV.find((n) => n.path === pathname);
  return (
    <DocPage title={item?.title ?? 'Coming soon'}>
      <div className='notebook notebook-squared'>
        <p>
          <span className='badge badge-warning badge-stamp'>Draft</span>
        </p>
        <p className='handwriting fs-md'>
          Homework not handed in yet — this page is still being written.
        </p>
        <p className='text-muted'>
          The component may already ship (look in <code>src/</code>); only its
          page is missing.
        </p>
      </div>
    </DocPage>
  );
}

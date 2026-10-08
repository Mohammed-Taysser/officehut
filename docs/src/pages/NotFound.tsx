import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className='doc-404 container-narrow'>
      <span className='badge badge-danger badge-stamp is-animated fs-lg'>
        Return to sender
      </span>
      <h1 className='mt-5'>No such page in the filing cabinet</h1>
      <p className='lead mt-2'>
        The link may be old, or the drawer was reorganised.
      </p>
      <div className='btn-list mt-5'>
        <Link to='/' className='btn btn-dark'>
          Back to the front desk
        </Link>
        <Link to='/docs' className='btn btn-outline'>
          Open the guide
        </Link>
      </div>
    </div>
  );
}

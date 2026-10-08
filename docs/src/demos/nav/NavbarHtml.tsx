// Plain markup — the vanilla data API opens the menu row on phones.
export default function NavbarHtml() {
  return (
    <header className='navbar'>
      <button
        type='button'
        className='navbar-toggle'
        data-oh-toggle='collapse'
        data-oh-target='#demo-navbar-menu'
        aria-controls='demo-navbar-menu'
        aria-expanded='false'
        aria-label='Menu'
      />
      <a className='navbar-brand' href='#'>
        Front desk
      </a>
      <div className='navbar-collapse collapse' id='demo-navbar-menu'>
        <div>
          <nav aria-label='Main'>
            <ul className='navbar-nav'>
              <li>
                <a className='navbar-link' href='#'>
                  Visitors
                </a>
              </li>
              <li>
                <a className='navbar-link' href='#' aria-current='page'>
                  Room bookings
                </a>
              </li>
              <li>
                <a className='navbar-link' href='#'>
                  Parcels
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className='navbar-end'>
        <span className='navbar-text'>Reception · Floor 2</span>
      </div>
    </header>
  );
}

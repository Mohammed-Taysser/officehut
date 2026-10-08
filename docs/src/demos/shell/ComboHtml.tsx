// Plain markup — the drawer, its backdrop and the group all use the stock
// collapse data API. The outer frame (height + contain) is for the preview only.
export default function ComboHtml() {
  return (
    <div
      className='border rounded-lg'
      style={{ height: 420, overflow: 'hidden', contain: 'paint' }}
    >
      <div className='shell' style={{ minHeight: 0, height: '100%' }}>
        <aside
          className='sidebar'
          id='demo-html-sidebar'
          aria-label='Help desk'
        >
          <div className='sidebar-header'>
            <a className='sidebar-brand' href='#'>
              Help desk
            </a>
            <button
              type='button'
              className='btn-close sidebar-close'
              data-oh-toggle='collapse'
              data-oh-target='#demo-html-sidebar'
              aria-label='Close menu'
            />
          </div>
          <div className='sidebar-body'>
            <nav aria-label='Help desk'>
              <ul className='nav-list'>
                <li className='nav-label'>Queues</li>
                <li className='nav-item'>
                  <a className='nav-link' href='#' aria-current='page'>
                    <span className='nav-text'>Unassigned</span>
                    <span className='nav-badge'>9</span>
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#'>
                    <span className='nav-text'>My tickets</span>
                    <span className='nav-badge'>14</span>
                  </a>
                </li>
                <li className='nav-item nav-group'>
                  <button
                    type='button'
                    className='nav-link nav-toggle'
                    data-oh-toggle='collapse'
                    data-oh-target='#demo-html-group'
                    aria-controls='demo-html-group'
                    aria-expanded='false'
                  >
                    <span className='nav-text'>By building</span>
                  </button>
                  <div className='collapse' id='demo-html-group'>
                    <div>
                      <ul className='nav-list'>
                        <li className='nav-item'>
                          <a className='nav-link' href='#'>
                            <span className='nav-text'>Building A</span>
                          </a>
                        </li>
                        <li className='nav-item'>
                          <a className='nav-link' href='#'>
                            <span className='nav-text'>Building B</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li className='nav-label'>Reports</li>
                <li className='nav-item'>
                  <a className='nav-link' href='#'>
                    <span className='nav-text'>Response times</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className='sidebar-footer text-muted'>On call: Youssef</div>
        </aside>
        <div
          className='sidebar-backdrop'
          data-oh-toggle='collapse'
          data-oh-target='#demo-html-sidebar'
          aria-hidden='true'
        />

        <header className='navbar'>
          <button
            type='button'
            className='navbar-toggle'
            data-oh-toggle='collapse'
            data-oh-target='#demo-html-sidebar'
            aria-controls='demo-html-sidebar'
            aria-expanded='false'
            aria-label='Open menu'
          />
          <span className='navbar-text'>Tickets</span>
          <div className='navbar-end'>
            <a className='btn btn-sm btn-primary' href='#'>
              New ticket
            </a>
          </div>
        </header>

        <div className='shell-main bg-paper' style={{ overflow: 'auto' }}>
          <div className='container-fluid page'>
            <div className='page-header'>
              <div>
                <h2 className='page-title'>Unassigned</h2>
                <p className='page-subtitle m-0'>
                  9 tickets · oldest opened 3 h ago
                </p>
              </div>
            </div>
            <p className='text-muted'>Ticket list goes here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

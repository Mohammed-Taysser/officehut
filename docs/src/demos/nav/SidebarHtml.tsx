// Plain markup — groups open with the stock collapse data API, no extra JS.
export default function SidebarHtml() {
  return (
    <div style={{ height: 420 }}>
      <aside className='sidebar sidebar-static' aria-label='Facilities'>
        <div className='sidebar-header'>
          <a className='sidebar-brand' href='#'>
            Facilities desk
          </a>
        </div>
        <div className='sidebar-body'>
          <nav aria-label='Facilities'>
            <ul className='nav-list'>
              <li className='nav-label'>This week</li>
              <li className='nav-item'>
                <a className='nav-link' href='#' aria-current='page'>
                  <span className='nav-text'>Work orders</span>
                  <span className='nav-badge'>18</span>
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='#'>
                  <span className='nav-text'>Cleaning rota</span>
                </a>
              </li>
              <li className='nav-label'>Suppliers</li>
              <li className='nav-item nav-group'>
                <button
                  type='button'
                  className='nav-link nav-toggle'
                  data-oh-toggle='collapse'
                  data-oh-target='#demo-group-contracts'
                  aria-controls='demo-group-contracts'
                  aria-expanded='true'
                >
                  <span className='nav-text'>Contracts</span>
                  <span className='nav-badge'>7</span>
                </button>
                <div className='collapse is-open' id='demo-group-contracts'>
                  <div>
                    <ul className='nav-list'>
                      <li className='nav-item'>
                        <a className='nav-link' href='#'>
                          <span className='nav-text'>
                            Lifts &amp; escalators
                          </span>
                        </a>
                      </li>
                      <li className='nav-item'>
                        <a className='nav-link' href='#'>
                          <span className='nav-text'>Waste collection</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className='nav-item nav-group'>
                <button
                  type='button'
                  className='nav-link nav-toggle'
                  data-oh-toggle='collapse'
                  data-oh-target='#demo-group-keys'
                  aria-controls='demo-group-keys'
                  aria-expanded='false'
                >
                  <span className='nav-text'>Keys &amp; passes</span>
                </button>
                <div className='collapse' id='demo-group-keys'>
                  <div>
                    <ul className='nav-list'>
                      <li className='nav-item'>
                        <a className='nav-link' href='#'>
                          <span className='nav-text'>Issued</span>
                        </a>
                      </li>
                      <li className='nav-item'>
                        <a className='nav-link' href='#'>
                          <span className='nav-text'>Lost &amp; replaced</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <div className='sidebar-footer text-muted'>Building B · v4.2</div>
      </aside>
    </div>
  );
}

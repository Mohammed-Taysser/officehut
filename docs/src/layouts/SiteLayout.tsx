import {
  IconBrandGithub,
  IconDeviceDesktop,
  IconMoon,
  IconSun,
} from '@tabler/icons-react';
import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { useTheme, type Theme } from 'officehut/react';
import { Logo } from '../components/Logo';

const REPO = 'https://github.com/mohammed-taysser/officehut';

/** Scroll to top on page change, to the anchor on hash change. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

const NEXT: Record<Theme, Theme> = {
  light: 'dark',
  dark: 'auto',
  auto: 'light',
};
const LABEL: Record<Theme, string> = {
  light: 'Day',
  dark: 'Night shift',
  auto: 'Follow system',
};

function ThemeSwitch() {
  const [theme, setTheme] = useTheme();
  const Icon =
    theme === 'dark'
      ? IconMoon
      : theme === 'auto'
        ? IconDeviceDesktop
        : IconSun;
  return (
    <button
      type='button'
      className='btn btn-ghost btn-icon btn-sm'
      onClick={() => setTheme(NEXT[theme])}
      aria-label={`Theme: ${LABEL[theme]}. Switch to ${LABEL[NEXT[theme]]}`}
      title={`Theme: ${LABEL[theme]}`}
    >
      <Icon size={18} />
    </button>
  );
}

export function SiteLayout() {
  return (
    <>
      <ScrollManager />
      <a href='#main' className='visually-hidden-focusable doc-skip'>
        Skip to content
      </a>
      <header className='doc-topbar'>
        <Link to='/' className='doc-brand'>
          <Logo />
          <span>officehut</span>
          <span className='doc-version font-mono'>v{__OH_VERSION__}</span>
        </Link>
        <nav className='doc-topnav' aria-label='Main'>
          <NavLink to='/docs' end>
            Guide
          </NavLink>
          <NavLink to='/docs/components/button'>Components</NavLink>
          <NavLink to='/examples/dashboard'>Examples</NavLink>
        </nav>
        <div className='doc-topbar-end'>
          <ThemeSwitch />
          <a
            className='btn btn-ghost btn-icon btn-sm'
            href={REPO}
            aria-label='Source on GitHub'
          >
            <IconBrandGithub size={18} />
          </a>
        </div>
      </header>
      <main id='main'>
        <Outlet />
      </main>
    </>
  );
}

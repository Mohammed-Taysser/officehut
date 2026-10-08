import type { ComponentType } from 'react';
import { createBrowserRouter } from 'react-router';
import { FLAT_NAV } from '../content/nav';
import { DocsLayout } from '../layouts/DocsLayout';
import { SiteLayout } from '../layouts/SiteLayout';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Missing from '../pages/Missing';
import { RouteFallback } from '../components/RouteFallback';
import { RouteError } from '../components/RouteError';

const pages = import.meta.glob<{ default: ComponentType }>([
  '../pages/**/*.tsx',
  '!../pages/Home.tsx',
  '!../pages/NotFound.tsx',
  '!../pages/Missing.tsx',
]);

function lazyPage(page: string) {
  const load = pages[`../pages/${page}.tsx`];
  return async () => ({ Component: load ? (await load()).default : Missing });
}

export const router = createBrowserRouter(
  [
    {
      element: <SiteLayout />,
      hydrateFallbackElement: <RouteFallback />,
      errorElement: <RouteError />,
      children: [
        { index: true, element: <Home /> },
        {
          element: <DocsLayout />,
          errorElement: <RouteError />,
          children: FLAT_NAV.map((item) => ({
            path: item.path,
            lazy: lazyPage(item.page),
            handle: item,
            errorElement: <RouteError />,
          })),
        },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/' },
);

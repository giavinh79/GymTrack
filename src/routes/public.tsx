// import { lazyImport } from 'src/utils';

import { RouteObject } from 'react-router-dom';

import { LandingPage } from 'src/screens';
// const { LandingPage } = lazyImport(() => import('src/screens'), 'LandingPage');

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <LandingPage />,
  },
];

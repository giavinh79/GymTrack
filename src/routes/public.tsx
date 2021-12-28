import { RouteObject } from 'react-router-dom';

import { LandingPage } from 'src/pages';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <LandingPage />,
  },
];

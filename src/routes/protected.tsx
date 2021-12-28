import { Suspense } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';

import { lazyImport } from 'src/utils';
import Homebar from 'src/features/home/Homebar';
import { DefaultPageLoader } from 'src/components';

const { HomePage } = lazyImport(() => import('src/pages'), 'HomePage');
const { DetailsPage } = lazyImport(() => import('src/pages'), 'DetailsPage');

const ProtectedPage = () => {
  return (
    <>
      <Homebar />
      <Suspense fallback={<DefaultPageLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export const protectedRoutes: RouteObject[] = [
  {
    path: '/home',
    element: <ProtectedPage />,
    children: [
      { path: '', element: <HomePage />, index: true },
      { path: 'details/*', element: <DetailsPage /> },
      { path: '*', element: <Navigate to='.' /> },
    ],
  },
];

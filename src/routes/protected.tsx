import { Suspense } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import { createStyles } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ErrorBoundary } from '@sentry/react';

import { ROUTES } from 'src/routes/constants';
import { AuthenticatedMobileNavbar, AuthenticatedNavbar, ErrorFallback, RunningLoader } from 'src/shared/components';
import { lazyImport } from 'src/utils';

const { HomePage } = lazyImport(() => import('src/pages'), 'HomePage');
const { DetailsPage } = lazyImport(() => import('src/pages'), 'DetailsPage');

const useProtectedPageStyles = createStyles((theme) => ({
  pageContainer: {
    padding: '1rem',
    marginTop: 0,
    marginLeft: '5rem',
    width: 'calc(100% - 5rem)',
    backgroundColor: 'transparent',

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      marginTop: '3.5rem',
      marginLeft: 0,
      width: '100%',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    },
  },
}));

const ProtectedPage = () => {
  const { classes } = useProtectedPageStyles();
  const matches = useMediaQuery(`(min-width: 769px)`);

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      {matches ? <AuthenticatedNavbar /> : <AuthenticatedMobileNavbar />}
      <Suspense fallback={<RunningLoader transparentBng={false} />}>
        <div className={classes.pageContainer}>
          <Outlet />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export const protectedRoutes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <ProtectedPage />,
    children: [
      { path: '', element: <HomePage />, index: true },
      { path: 'details/*', element: <DetailsPage /> },
      { path: '*', element: <Navigate to='.' /> },
    ],
  },
];

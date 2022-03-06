import { RouteObject } from 'react-router-dom';
import { ErrorBoundary } from '@sentry/react';

import { LandingPage } from 'src/pages';
import { ErrorFallback } from 'src/shared/components';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ErrorBoundary fallback={<ErrorFallback />}>
        <LandingPage />
      </ErrorBoundary>
    ),
  },
];

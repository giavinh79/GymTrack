import * as Sentry from '@sentry/react';

// @TODO - see whether this is necessary/helpful * need to filter out sensitive state data so they don't go in Sentry Logs
export const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  // Optionally pass options listed below
});

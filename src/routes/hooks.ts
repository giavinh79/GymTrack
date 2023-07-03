import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';
import * as Sentry from '@sentry/react';

import { auth } from 'src/auth/firebase';
import { useLazyGetSelectedUserRoutineQuery } from 'src/services/routine';
import { ERROR } from 'src/shared/constants';
import { useIsMounted } from 'src/shared/hooks/useIsMounted';
import { setContext } from 'src/slices';

/**
 * Fetch user and user routine information and store in global state for protected pages
 */
export const useInitializeApp = (): { loading: boolean } => {
  const [loading, setLoading] = useState(true);

  const isMounted = useIsMounted();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getSelectedUserRoutine] = useLazyGetSelectedUserRoutineQuery();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        return navigate('/');
      }

      if (!loading) {
        return;
      }

      try {
        const accessToken = await user.getIdToken();

        const context = {
          user: {
            email: user.email ?? '',
            id: user.uid,
          },
          auth: {
            token: accessToken,
          },
        };
        dispatch(setContext(context));

        const { isError } = await getSelectedUserRoutine(context.user.id); // load and cache current routine

        if (isError) {
          showNotification({
            id: 'get-selected-user-routine-error',
            title: 'Error',
            message: ERROR.GENERIC,
            color: 'red',
          });
          return setLoading(false);
          // @TODO manually let Sentry know w/ captureException since this error should never happen
        }
        Sentry.setUser({ id: context.user.id, email: context.user.email }); // for better debugging
      } catch (err) {
        // likely a firebase auth error thrown by `getIdToken` due to loss of network connection
        showNotification({
          id: 'get-selected-user-routine-error',
          title: 'Error',
          message: 'Network connection was lost, please try refreshing.',
          color: 'red',
        });
      }

      if (!isMounted.current) {
        return;
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch, getSelectedUserRoutine, loading, navigate, isMounted]);

  return {
    loading,
  };
};

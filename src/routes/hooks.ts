import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';
import * as Sentry from '@sentry/react';

import { auth } from 'src/auth/firebase';
import { useLazyGetSelectedUserRoutineQuery } from 'src/services/routine';
import { ERROR } from 'src/shared/constants';
import { setContext, setSelectedRoutine } from 'src/slices';
import { isNil } from 'src/utils';

// Fetch user and user routine information and store in global state for protected pages
export const useInitializeApp = (): { loading: boolean } => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getSelectedUserRoutine] = useLazyGetSelectedUserRoutineQuery();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (isNil(user)) {
        return navigate('/');
      }

      if (!loading) {
        // only need to initialize once
        return;
      }

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

      const { data: selectedRoutine, isError } = await getSelectedUserRoutine(context.user.id);

      if (isError) {
        showNotification({ title: 'Error', message: ERROR.GENERIC, color: 'red' });
        return setLoading(false);
        // @TODO manually let Sentry know w/ captureException
      }

      dispatch(setSelectedRoutine(selectedRoutine));
      setLoading(false);

      // for better debugging
      Sentry.setUser({ id: context.user.id, email: context.user.email });
    });

    return () => unsubscribe();
  }, [dispatch, getSelectedUserRoutine, loading, navigate]);

  return {
    loading,
  };
};

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/react';

import { auth } from 'src/auth/firebase';
import { useLazyGetUsersRoutinesQuery } from 'src/services/routine';
import { setContext, setSelectedRoutine } from 'src/slices';
import { isNil } from 'src/utils';

// Fetch user and user routine information and store in global state for protected pages
export const useInitializeApp = (): { loading: boolean } => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getUsersRoutines] = useLazyGetUsersRoutinesQuery();

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

      const { data: routines, isError } = await getUsersRoutines(context.user.id);

      if (isError) {
        return setLoading(false);
        // @TODO manually let Sentry know w/ captureException
        // show notification informing user and telling them to refresh/msg support
      }

      const selectedRoutine = routines?.filter((routine) => routine.isSelected)?.[0];
      dispatch(setSelectedRoutine(selectedRoutine));
      setLoading(false);

      // for better debugging
      Sentry.setUser({ id: context.user.id, email: context.user.email });
    });

    return () => unsubscribe();
  }, [dispatch, getUsersRoutines, loading, navigate]);

  return {
    loading,
  };
};

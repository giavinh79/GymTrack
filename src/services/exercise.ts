import { createApi } from '@reduxjs/toolkit/query/react';

import { getProtectedBaseQuery } from 'src/services';
import { showError } from 'src/shared/notifications';
import { IExercise } from 'src/types';

interface AddRoutineExerciseMutationArgs {
  userId: string;
  routineId: string;
  exercise: IExercise;
}

export const exerciseApi = createApi({
  reducerPath: 'exerciseApi',
  baseQuery: getProtectedBaseQuery(),
  endpoints: (builder) => ({
    addRoutineExercise: builder.mutation<IExercise, AddRoutineExerciseMutationArgs>({
      query: ({ userId, routineId, exercise }) => ({
        url: `user/${userId}/routine/${routineId}`,
        method: 'PUT',
        body: exercise,
      }),
    }),
    getExercises: builder.query<IExercise[], void>({
      query: () => 'exercises',
      async onQueryStarted(_, { queryFulfilled }) {
        queryFulfilled.catch((err) => {
          showError({
            id: 'create-exercise-error',
            title: 'Error adding an exercise',
            message: 'Please try again in a few seconds or contact our support if you continue having issues.',
          });
          throw err; // for Sentry
        });
      },
    }),
  }),
});

export const { useGetExercisesQuery } = exerciseApi;

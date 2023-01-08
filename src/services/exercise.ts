import { createApi } from '@reduxjs/toolkit/query/react';

import { getProtectedBaseQuery } from 'src/services';
import { showError } from 'src/shared/notifications';
import { EDay, IExercise, ISet } from 'src/types';

interface AddRoutineExerciseMutationArgs {
  userId: string;
  routineId: number;
  exerciseId: number;
  addRoutineExercisePayload: {
    day: EDay;
    exerciseOrder: number;
    sets: Partial<Omit<ISet, 'id'>>[];
  };
}

export const exerciseApi = createApi({
  reducerPath: 'exerciseApi',
  baseQuery: getProtectedBaseQuery(),
  endpoints: (builder) => ({
    addRoutineExercise: builder.mutation<IExercise, AddRoutineExerciseMutationArgs>({
      query: ({ userId, routineId, exerciseId, addRoutineExercisePayload }) => ({
        url: `user/${userId}/routine/${routineId}/exercise/${exerciseId}`,
        method: 'PUT',
        body: {
          ...addRoutineExercisePayload,
          day: addRoutineExercisePayload.day.toUpperCase(),
        },
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

export const { useAddRoutineExerciseMutation, useGetExercisesQuery } = exerciseApi;

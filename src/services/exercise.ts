import { createApi } from '@reduxjs/toolkit/query/react';

import { transformRoutineExerciseToRoutineDayExercise } from 'src/features/exercise-details/utils';
import { getProtectedBaseQuery } from 'src/services';
import { showError } from 'src/shared/notifications';
import { EDay, IExercise, IRoutineExercise, ISet } from 'src/types';

import { routineApi } from './routine';

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

interface UpdateRoutineExercisesMutationArgs {
  userId: string;
  routineId: number;
  updateRoutineExercisesPayload: {
    id: number;
    day: EDay;
    exerciseId: number;
    exerciseOrder?: number;
    sets?: Partial<Omit<ISet, 'id'>>[];
  }[];
}

export const exerciseApi = createApi({
  reducerPath: 'exerciseApi',
  baseQuery: getProtectedBaseQuery(),
  endpoints: (builder) => ({
    addRoutineExercise: builder.mutation<IRoutineExercise, AddRoutineExerciseMutationArgs>({
      query: ({ userId, routineId, exerciseId, addRoutineExercisePayload }) => ({
        url: `user/${userId}/routine/${routineId}/exercise/${exerciseId}`,
        method: 'PUT',
        body: {
          ...addRoutineExercisePayload,
          day: addRoutineExercisePayload.day.toUpperCase(),
        },
      }),
      async onQueryStarted({ userId }, { dispatch, queryFulfilled }) {
        const newRoutineExercise = (await queryFulfilled)?.data;

        dispatch(
          routineApi.util.updateQueryData('getSelectedUserRoutine', userId, (selectedRoutine) => {
            const routineDayExercise = transformRoutineExerciseToRoutineDayExercise(newRoutineExercise);
            selectedRoutine.workout[newRoutineExercise.day.toLowerCase() as EDay].push(routineDayExercise);
          })
        );
      },
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
    updateRoutineExercise: builder.mutation<IRoutineExercise, AddRoutineExerciseMutationArgs>({
      query: ({ userId, routineId, exerciseId, addRoutineExercisePayload }) => ({
        url: `user/${userId}/routine/${routineId}/exercise/${exerciseId}`,
        method: 'POST',
        body: {
          ...addRoutineExercisePayload,
          day: addRoutineExercisePayload.day.toUpperCase(),
        },
      }),
      onQueryStarted({ userId, ...patch }, { dispatch, queryFulfilled }) {
        const payload = patch.addRoutineExercisePayload;
        const patchResult = dispatch(
          routineApi.util.updateQueryData('getSelectedUserRoutine', userId, (selectedRoutine) => {
            selectedRoutine.workout[payload.day].map((exercise) =>
              exercise.id === patch.exerciseId ? { ...exercise, ...payload } : exercise
            );
          })
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
    updateRoutineExercises: builder.mutation<IRoutineExercise[], UpdateRoutineExercisesMutationArgs>({
      query: ({ userId, routineId, updateRoutineExercisesPayload }) => ({
        url: `user/${userId}/routine/${routineId}/exercise`,
        method: 'POST',
        body: updateRoutineExercisesPayload.map((exercise) =>
          exercise.day
            ? {
                ...exercise,
                day: exercise.day.toUpperCase(),
              }
            : exercise
        ),
      }),
      onQueryStarted({ userId, ...patch }, { dispatch, queryFulfilled }) {
        const payload = patch.updateRoutineExercisesPayload;

        const patchResult = dispatch(
          routineApi.util.updateQueryData('getSelectedUserRoutine', userId, (selectedRoutine) => {
            payload.map((updatedExercise) => {
              for (let i = 0; i < selectedRoutine.workout[updatedExercise.day].length; i++) {
                // @TODO - clean up and optimize this logic
                const currentRoutineExercise = selectedRoutine.workout[updatedExercise.day][i];

                if (currentRoutineExercise.exerciseId === updatedExercise.exerciseId) {
                  selectedRoutine.workout[updatedExercise.day][i] = {
                    ...currentRoutineExercise,
                    exerciseOrder: updatedExercise.exerciseOrder ?? currentRoutineExercise.exerciseOrder,
                  };
                  if (updatedExercise.exerciseOrder && currentRoutineExercise.exerciseOrder) {
                    selectedRoutine.workout[updatedExercise.day].sort((a, b) => a.exerciseOrder - b.exerciseOrder);
                  }
                }
              }
            });
          })
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
});

export const {
  useAddRoutineExerciseMutation,
  useGetExercisesQuery,
  useUpdateRoutineExerciseMutation,
  useUpdateRoutineExercisesMutation,
} = exerciseApi;

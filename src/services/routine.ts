import { createApi } from '@reduxjs/toolkit/query/react';

import { getProtectedBaseQuery } from 'src/services';
import type { IRoutine, IUserRoutine } from 'src/types/internal/routine';

type CreateRoutineMutationArgs = Pick<IRoutine, 'name' | 'description'> & { userId: string };

export const routineApi = createApi({
  reducerPath: 'routineApi',
  baseQuery: getProtectedBaseQuery(),
  tagTypes: ['SelectedRoutine'],
  endpoints: (builder) => ({
    createRoutine: builder.mutation<IUserRoutine, CreateRoutineMutationArgs>({
      query: ({ name, description, userId }) => ({
        url: `user/${userId}/routine`,
        method: 'PUT',
        body: {
          name,
          description,
        },
      }),
      invalidatesTags: ['SelectedRoutine'],
    }),
    deleteRoutine: builder.mutation<number, number>({
      query: (routineId) => `routine/${routineId}`,
    }),
    getUsersRoutines: builder.query<IUserRoutine[], string>({
      query: (userId: string) => `user/${userId}/routines`,
    }),
    getSelectedUserRoutine: builder.query<IUserRoutine, string>({
      query: (userId: string) => `user/${userId}/routine/selected`,
      providesTags: ['SelectedRoutine'],
    }),
  }),
});

export const {
  useCreateRoutineMutation,
  useGetSelectedUserRoutineQuery,
  useLazyGetSelectedUserRoutineQuery,
  useLazyGetUsersRoutinesQuery,
} = routineApi;

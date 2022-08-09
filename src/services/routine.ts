import { createApi } from '@reduxjs/toolkit/query/react';

import { getProtectedBaseQuery } from 'src/services';
import type { IRoutine, IUserRoutine } from 'src/types/internal/routine';

export const routineApi = createApi({
  reducerPath: 'routineApi',
  baseQuery: getProtectedBaseQuery(),
  endpoints: (builder) => ({
    createRoutine: builder.mutation<IRoutine, Partial<IRoutine>>({
      query: (routine) => ({
        url: 'routine',
        method: 'PUT',
        body: routine,
      }),
    }),
    deleteRoutine: builder.mutation<number, number>({
      query: () => 'routine',
    }),
    getUsersRoutines: builder.query<IUserRoutine[], string>({
      query: (userId: string) => `user/${userId}/routines`,
    }),
  }),
});

export const { useCreateRoutineMutation, useLazyGetUsersRoutinesQuery } = routineApi;

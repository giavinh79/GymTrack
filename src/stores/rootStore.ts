import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { exerciseApi } from 'src/services/exercise';
import { routineApi } from 'src/services/routine';
import contextReducer from 'src/slices/context/contextSlice';
import loadingRoutinesReducer from 'src/slices/gym/routine/routinesLoadingSlice';
import routinesReducer from 'src/slices/gym/routine/routinesSlice';
import modalReducer from 'src/slices/modal/modalSlice';

export const store = configureStore({
  reducer: {
    // api
    [routineApi.reducerPath]: routineApi.reducer,
    [exerciseApi.reducerPath]: exerciseApi.reducer,

    context: contextReducer,

    // general
    modal: modalReducer,

    // routines
    loadingRoutines: loadingRoutinesReducer,
    routines: routinesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([routineApi.middleware, exerciseApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import authReducer from 'src/slices/auth/authSlice';
import refreshReducer from 'src/slices/general/refreshSlice';
import loadingRoutinesReducer from 'src/slices/gym/routine/routinesLoadingSlice';
import routinesReducer from 'src/slices/gym/routine/routinesSlice';
import modalReducer from 'src/slices/modal/modalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,

    // general
    modal: modalReducer,
    refresh: refreshReducer,

    // routines
    loadingRoutines: loadingRoutinesReducer,
    routines: routinesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

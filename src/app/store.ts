import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginModalReducer from '../slices/loginSlice';
import signupModalReducer from '../slices/signupSlice';
import authReducer from '../slices/authSlice';
import modalReducer from '../slices/modalSlice';
import loadingReducer from '../slices/loadingSlice';
import routinesReducer from '../slices/routinesSlice';
import refreshReducer from '../slices/refreshSlice';

export const store = configureStore({
  reducer: {
    login: loginModalReducer,
    signup: signupModalReducer,
    auth: authReducer,
    modal: modalReducer,
    loading: loadingReducer,
    routines: routinesReducer,
    refresh: refreshReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

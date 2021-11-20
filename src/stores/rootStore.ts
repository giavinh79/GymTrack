import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginModalReducer from '../slices/auth/loginSlice';
import signupModalReducer from '../slices/auth/signupSlice';
import authReducer from '../slices/auth/authSlice';
import modalReducer from '../slices/modal/modalSlice';
import loadingReducer from '../slices/general/loadingSlice';
import routinesReducer from '../slices/gym/routinesSlice';
import refreshReducer from '../slices/general/refreshSlice';

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

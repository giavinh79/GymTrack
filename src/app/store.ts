import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

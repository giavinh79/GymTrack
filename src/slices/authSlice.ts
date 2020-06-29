import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const initialState: boolean = false;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: () => true,
    logoutUser: () => false,
  },
});

// Actions
export const { loginUser, logoutUser } = authSlice.actions;

// State value
export const selectAuth = (state: RootState) => state.auth;

// Reducer
export default authSlice.reducer;

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

export const { loginUser, logoutUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;

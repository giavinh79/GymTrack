import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../stores/rootStore';

const initialState = false;

const authSlice = createSlice({
  name: 'auth.loggedIn',
  initialState,
  reducers: {
    loginUser: () => true,
    logoutUser: () => false,
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;

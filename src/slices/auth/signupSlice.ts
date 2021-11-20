/* Toggles visibility of sign up modal */

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../stores/rootStore';

interface SignupState {
  email: string;
}

const initialState: SignupState = { email: '' };

const signupSlice = createSlice({
  name: 'auth.signup',
  initialState: initialState,
  reducers: {
    enableEmailRegistration(state, action) {
      state.email = action.payload;
    },
  },
});

export const { enableEmailRegistration } = signupSlice.actions;

export const selectSignupEmail = (state: RootState) => state.signup.email;

export default signupSlice.reducer;

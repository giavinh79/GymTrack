/* Toggles visibility of sign up modal */

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface SignupState {
  email: string;
}

const initialState: SignupState = { email: '' };

const signupSlice = createSlice({
  name: 'signup',
  initialState: initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
  },
});

// Actions
export const { setEmail } = signupSlice.actions;

// Value to pass to useSelector()
export const selectSignupEmail = (state: RootState) => state.signup.email;

// Reducer
export default signupSlice.reducer;

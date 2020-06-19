/* Toggles visibility of login modal */

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const initialState: boolean = false;

const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    toggleOn(state) {
      state = true;
    },
    toggleOff(state) {
      state = false;
    },
  },
});

// Actions
export const { toggleOn, toggleOff } = loginSlice.actions;

// State value
export const selectLogin = (state: RootState) => state.login;

// Reducer
export default loginSlice.reducer;

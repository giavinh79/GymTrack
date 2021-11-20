/* Toggles visibility of login modal */

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../stores/rootStore';

const initialState: boolean = false;

const loginSlice = createSlice({
  name: 'auth.login',
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

export const { toggleOn, toggleOff } = loginSlice.actions;

export const selectLogin = (state: RootState) => state.login;

export default loginSlice.reducer;

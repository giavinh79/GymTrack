import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'src/stores/rootStore';

export enum EModal {
  // auth
  SIGNUP = 'SIGNUP',
  LOGIN = 'LOGIN',

  // routines
  ADD_ROUTINE = 'ADD_ROUTINE',
  DELETE_ROUTINE = 'DELETE_ROUTINE',
  ROUTINE_INFO = 'ROUTINE_INFO',
  ADD_ROUTINE_EXERCISE = 'ADD_ROUTINE_EXERCISE',

  // default state
  NONE = 'NONE',
}

const initialState = EModal.NONE;

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    modalShown(_, action: PayloadAction<EModal>) {
      return action.payload;
    },
    modalHidden: () => EModal.NONE,
  },
});

export const { modalShown, modalHidden } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;

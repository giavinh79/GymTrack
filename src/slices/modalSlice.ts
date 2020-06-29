import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export enum Modal {
  SIGNUP = 'SIGNUP',
  LOGIN = 'LOGIN',
  ADD_ROUTINE = 'ADD_ROUTINE',
  NONE = 'NONE',
}

const initialState = Modal.NONE;

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showAddRoutineModal: () => Modal.ADD_ROUTINE,
    showLoginModal: () => Modal.LOGIN,
    hideModal: () => Modal.NONE,
  },
});

// Actions
export const { hideModal, showAddRoutineModal, showLoginModal } = modalSlice.actions;

// State value
export const selectModal = (state: RootState) => state.modal;

// Reducer
export default modalSlice.reducer;

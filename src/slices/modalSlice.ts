import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export enum Modal {
  SIGNUP = 'SIGNUP',
  LOGIN = 'LOGIN',
  ADD_ROUTINE = 'ADD_ROUTINE',
  DELETE_ROUTINE = 'DELETE_ROUTINE',
  ROUTINE_INFO = 'ROUTINE_INFO',
  NONE = 'NONE',
}

const initialState = Modal.NONE;

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showAddRoutineModal: () => Modal.ADD_ROUTINE,
    showLoginModal: () => Modal.LOGIN,
    showDeleteRoutineDialog: () => Modal.DELETE_ROUTINE,
    showRoutineInfo: () => Modal.ROUTINE_INFO,
    hideModal: () => Modal.NONE,
  },
});

// Actions
export const { hideModal, showAddRoutineModal, showDeleteRoutineDialog, showLoginModal } = modalSlice.actions;

// State value
export const selectModal = (state: RootState) => state.modal;

// Reducer
export default modalSlice.reducer;

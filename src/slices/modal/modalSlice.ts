import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../stores/rootStore';

export enum EModal {
  SIGNUP = 'SIGNUP',
  LOGIN = 'LOGIN',
  ADD_ROUTINE = 'ADD_ROUTINE',
  DELETE_ROUTINE = 'DELETE_ROUTINE',
  ROUTINE_INFO = 'ROUTINE_INFO',
  NONE = 'NONE',
}

const initialState = EModal.NONE;

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showAddRoutineModal: () => EModal.ADD_ROUTINE,
    showLoginModal: () => EModal.LOGIN,
    showDeleteRoutineDialog: () => EModal.DELETE_ROUTINE,
    showRoutineInfo: () => EModal.ROUTINE_INFO,
    hideModal: () => EModal.NONE,
  },
});

export const { hideModal, showAddRoutineModal, showDeleteRoutineDialog, showLoginModal } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;

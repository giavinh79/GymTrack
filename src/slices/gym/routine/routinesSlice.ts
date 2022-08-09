import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'src/stores/rootStore';
import { IUserRoutine } from 'src/types';

interface IContextState {
  selectedRoutine: IUserRoutine | undefined;
}

const initialState: IContextState = {
  selectedRoutine: undefined,
};

export const routinesSlice = createSlice({
  name: 'gym.routines',
  initialState,
  reducers: {
    setSelectedRoutine: (state, action: PayloadAction<IUserRoutine | undefined>) => {
      state.selectedRoutine = action.payload;
    },
  },
});

export const { setSelectedRoutine } = routinesSlice.actions;

export const selectedRoutine = (state: RootState) => state.routines.selectedRoutine;

export default routinesSlice.reducer;

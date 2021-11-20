import { RootState } from '../../stores/rootStore';
import { createSlice } from '@reduxjs/toolkit';

const routinesSlice = createSlice({
  name: 'gym.routines',
  initialState: [],
  reducers: {
    storeRoutines: (state, action) => {
      state = action.payload;
    },
  },
});

export const { storeRoutines } = routinesSlice.actions;

export const selectRoutines = (state: RootState) => state.routines;

export default routinesSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

import { RootState } from 'src/stores/rootStore';

export const routinesSlice = createSlice({
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

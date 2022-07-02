import { createSlice } from '@reduxjs/toolkit';

import { storeRoutines } from 'src/slices/gym/routine/routinesSlice';
import { RootState } from 'src/stores/rootStore';

const routinesLoadingSlice = createSlice({
  name: 'gym.routinesLoading',
  initialState: false,
  reducers: {
    routinesLoading: () => true,
    routinesLoaded: () => false,
  },
  extraReducers: (builder) => {
    builder.addCase(storeRoutines, () => {
      return false;
    });
  },
});

export const { routinesLoaded, routinesLoading } = routinesLoadingSlice.actions;

export const selectRoutinesLoading = (state: RootState) => state.loadingRoutines;

export default routinesLoadingSlice.reducer;

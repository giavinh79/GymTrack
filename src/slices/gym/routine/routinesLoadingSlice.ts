import { createSlice } from '@reduxjs/toolkit';

import { setSelectedRoutine } from 'src/slices/gym/routine/routinesSlice';
import { RootState } from 'src/stores/rootStore';

const routinesLoadingSlice = createSlice({
  name: 'gym.routinesLoading',
  initialState: false,
  reducers: {
    routinesLoading: () => true,
    routinesLoaded: () => false,
  },
  extraReducers: (builder) => {
    builder.addCase(setSelectedRoutine, () => {
      return false;
    });
  },
});

export const { routinesLoaded, routinesLoading } = routinesLoadingSlice.actions;

export const selectRoutinesLoading = (state: RootState) => state.loadingRoutines;

export default routinesLoadingSlice.reducer;

// @TODO - will need to take a look at this file again, most likely no longer necessary with RTK query (simply rely on exported isLoading from query/mutation hooks)
// in terms of it's current uses, we still want certain components to show loading indicators when user updates their selected routine

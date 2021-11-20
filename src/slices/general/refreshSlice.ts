import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../stores/rootStore';

/* For manually refreshing HTTP calls */
const refreshSlice = createSlice({
  name: 'refresh',
  initialState: false,
  reducers: {
    refreshData: (state) => !state,
  },
});

export const { refreshData } = refreshSlice.actions;

export const selectRefresh = (state: RootState) => state.refresh;

export default refreshSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

/* For manually refreshing HTTP calls */
const refreshSlice = createSlice({
  name: 'refresh',
  initialState: false,
  reducers: {
    refreshData: (state) => !state,
  },
});

// Actions
export const { refreshData } = refreshSlice.actions;

// Value to pass to useSelector()
export const selectRefresh = (state: RootState) => state.refresh;

// Reducer
export default refreshSlice.reducer;

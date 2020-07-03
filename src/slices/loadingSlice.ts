import { RootState } from '../app/store';
import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: true,
  reducers: {
    loading: () => true,
    doneLoading: () => false,
  },
});

// Actions
export const { loading, doneLoading } = loadingSlice.actions;

// Value to pass to useSelector()
export const selectLoading = (state: RootState) => state.loading;

// Reducer
export default loadingSlice.reducer;

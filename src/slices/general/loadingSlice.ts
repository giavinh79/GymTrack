import { RootState } from '../../stores/rootStore';
import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: true,
  reducers: {
    loading: () => true,
    doneLoading: () => false,
  },
});

export const { loading, doneLoading } = loadingSlice.actions;

export const selectLoading = (state: RootState) => state.loading;

export default loadingSlice.reducer;

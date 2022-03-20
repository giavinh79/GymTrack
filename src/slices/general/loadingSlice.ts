import { createSlice } from '@reduxjs/toolkit';

import { RootState } from 'src/stores/rootStore';

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

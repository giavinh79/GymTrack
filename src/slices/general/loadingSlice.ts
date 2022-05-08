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

export default loadingSlice.reducer;

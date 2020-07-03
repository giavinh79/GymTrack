import { RootState } from '../app/store';
import { createSlice } from '@reduxjs/toolkit';

const routinesSlice = createSlice({
  name: 'routines',
  initialState: [],
  reducers: {
    storeRoutines: (state, action) => {
      state = action.payload;
    },
  },
});

// Actions
export const { storeRoutines } = routinesSlice.actions;

// Value to pass to useSelector()
export const selectRoutines = (state: RootState) => state.routines;

// Reducer
export default routinesSlice.reducer;

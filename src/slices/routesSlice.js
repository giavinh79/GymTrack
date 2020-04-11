import { createSlice } from '@reduxjs/toolkit';

const routesSlice = createSlice({
  name: 'routes',
  initialState: [],
  reducers: {
    changeRoute(state, action) {
      const { url } = action.payload;
      state = url;
    },
  },
});

export const { changeRoute, toggleTodo } = routesSlice.actions;

export default routesSlice.reducer;

// toggleTodo(state, action) {
//   const todo = state.find((todo) => todo.id === action.payload);
//   if (todo) {
//     todo.completed = !todo.completed;
//   }
// },

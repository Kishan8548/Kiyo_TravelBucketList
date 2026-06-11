import { createSlice } from '@reduxjs/toolkit';

const visitedSlice = createSlice({
  name: 'visited',
  initialState: {
    places: [],
  },
  reducers: {
    markVisited(state, action) {
      const already = state.places.find(p => p.id === action.payload.id);
      if (!already) {
        state.places.unshift({ ...action.payload, visitedAt: new Date().toISOString() });
      }
    },
    unmarkVisited(state, action) {
      state.places = state.places.filter(p => p.id !== action.payload);
    },
  },
});

export const { markVisited, unmarkVisited } = visitedSlice.actions;
export default visitedSlice.reducer;

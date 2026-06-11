import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  destinations: [],
  filter: 'all',     // all | high | medium | low
  searchQuery: '',
};

const bucketListSlice = createSlice({
  name: 'bucketList',
  initialState,
  reducers: {
    addDestination: {
      reducer(state, action) {
        state.destinations.unshift(action.payload);
      },
      prepare(destination) {
        return {
          payload: {
            id: nanoid(),
            createdAt: new Date().toISOString(),
            ...destination,
          },
        };
      },
    },
    removeDestination(state, action) {
      state.destinations = state.destinations.filter(d => d.id !== action.payload);
    },
    updateDestination(state, action) {
      const idx = state.destinations.findIndex(d => d.id === action.payload.id);
      if (idx !== -1) state.destinations[idx] = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addDestination,
  removeDestination,
  updateDestination,
  setFilter,
  setSearchQuery,
} = bucketListSlice.actions;

export default bucketListSlice.reducer;

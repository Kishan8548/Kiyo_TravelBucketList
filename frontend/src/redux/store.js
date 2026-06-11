import { configureStore } from '@reduxjs/toolkit';
import bucketListReducer from './slices/bucketListSlice';
import visitedReducer from './slices/visitedSlice';
import authReducer from './slices/authSlice';
import { SEED_BUCKET_LIST, SEED_VISITED } from '../utils/seedData';

// ── LocalStorage persistence ──
const loadState = () => {
  try {
    const s = localStorage.getItem('nextstopState');
    return s ? JSON.parse(s) : undefined;
  } catch { return undefined; }
};

const saveState = (state) => {
  try {
    localStorage.setItem('nextstopState', JSON.stringify({
      bucketList: state.bucketList,
      visited:    state.visited,
    }));
  } catch { /* ignore */ }
};

// ── Seed preloaded state ──
// If nothing in localStorage, start with demo data so the UI looks populated
const persisted = loadState();

const preloadedState = persisted ?? {
  bucketList: {
    destinations: SEED_BUCKET_LIST,
    filter: 'all',
    searchQuery: '',
  },
  visited: {
    places: SEED_VISITED,
  },
};

export const store = configureStore({
  reducer: {
    bucketList: bucketListReducer,
    visited:    visitedReducer,
    auth:       authReducer,
  },
  preloadedState,
});

// Persist on every change
store.subscribe(() => saveState(store.getState()));

export default store;

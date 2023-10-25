import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './LoginSlice.js';

const store = configureStore({
  reducer: loginSlice,
});

export default store;

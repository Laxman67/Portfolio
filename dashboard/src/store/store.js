import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlices';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

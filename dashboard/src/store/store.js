import { configureStore } from '@reduxjs/toolkit';

// Specific Reducers
import userReducer from './slice/userSlices';
import forgotResetPasswordReducer from './slice/forgotResetPasswordSlice';
import messagesSlices from './slice/messagesSlices';

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotResetPasswordReducer,
    messages: messagesSlices,
  },
});

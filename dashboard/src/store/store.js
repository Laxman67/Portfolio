import { configureStore } from '@reduxjs/toolkit';

// Specific Reducers
import userReducer from './slice/userSlices';
import forgotResetPasswordReducer from './slice/forgotResetPasswordSlice';
import messagesReducer from './slice/messagesSlices';
import timelineReducer from './slice/timelineSlices';

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotResetPasswordReducer,
    messages: messagesReducer,
    timeline: timelineReducer,
  },
});

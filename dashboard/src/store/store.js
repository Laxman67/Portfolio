import { configureStore } from '@reduxjs/toolkit';

// Specific Reducers
import userReducer from './slice/userSlices';
import forgotResetPasswordReducer from './slice/forgotResetPasswordSlice';
import messagesReducer from './slice/messagesSlices';
import timelineReducer from './slice/timelineSlices';
import skillReducer from './slice/skillSlice';
import applicationReducer from './slice/applicationSlice';
import projectReducer from './slice/projectSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotResetPasswordReducer,
    messages: messagesReducer,
    timeline: timelineReducer,
    skill: skillReducer,
    application: applicationReducer,
    project: projectReducer,
  },
});

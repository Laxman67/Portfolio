import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const initialState = {
  loading: false,
  user: {},
  isAuthenticated: false,
  error: null,
  message: null,
  isUpdated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },

    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = {};
      state.error = action.payload;
    },
    clearAllError(state, action) {
      state.error = null;
      state.user = state.user;
    },
  },
});

export const login = (email, password) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());

  try {
    const { data } = await axios.post(
      'http://localhost:4000/api/v1/user/login ',
      { email, password },
      { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
    );
    console.log(data);

    dispatch(userSlice.actions.loginSuccess(data.user));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error.response.data.message));
  }
};

export const clearAllUserError = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllError());
};

export default userSlice.reducer;

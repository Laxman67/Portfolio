import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}`;

const initialState = {
  loading: false,
  error: null,
  message: null,
};

const forgotResetPassSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    forgotPasswordRequest(state) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },

    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetPasswordRequest(state) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },

    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllError(state) {
      state.error = null;
    },
  },
});

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotResetPassSlice.actions.forgotPasswordRequest());

  try {
    const { data } = await axios.post(
      `${BACKEND_URL}/user/password/forget/`,
      { email },
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      }
    );

    console.log(data.message);

    dispatch(forgotResetPassSlice.actions.forgotPasswordSuccess(data.message));
    dispatch(forgotResetPassSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      forgotResetPassSlice.actions.forgotPasswordFailed(
        error.response.data.message
      )
    );
  }
};

export const resetPassword =
  (token, password, confirmPassword) => async (dispatch) => {
    dispatch(forgotResetPassSlice.actions.resetPasswordRequest());

    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/user/password/reset/${token}`,
        { password, confirmPassword },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      dispatch(forgotResetPassSlice.actions.resetPasswordSuccess(data.message));
      dispatch(forgotResetPassSlice.actions.clearAllError());
    } catch (error) {
      dispatch(
        forgotResetPassSlice.actions.resetPasswordFailed(
          error.response.data.message
        )
      );
    }
  };

export const clearAllForgotPasswordError = () => (dispatch) => {
  dispatch(forgotResetPassSlice.actions.clearAllError());
};

export default forgotResetPassSlice.reducer;

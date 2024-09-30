import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/user`;

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
    loginRequest(state) {
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
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    loadUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },

    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    logoutFailed(state, action) {
      state.loading = false;
      // eslint-disable-next-line no-self-assign
      state.isAuthenticated = state.isAuthenticated;
      // eslint-disable-next-line no-self-assign
      state.user = state.user;
      state.error = action.payload;
    },
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
      state.message = action.payload;
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },
    updatePasswordRequest(state) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },
    updateProfileRequest(state) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updateProfileFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },
    updateProfileResetAfterUpdate(state) {
      state.error = null;
      state.isUpdated = false;
      state.message = null;
    },
    clearAllError(state) {
      state.error = null;
    },
  },
});

export const login = (email, password) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest());

  try {
    const { data } = await axios.post(
      `${BACKEND_URL}/login `,

      { email, password },
      { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
    );

    dispatch(userSlice.actions.loginSuccess(data.user));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error.response.data.message));
  }
};
export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.loadUserRequest());

  try {
    const { data } = await axios.get(`${BACKEND_URL}/me `, {
      withCredentials: true,
    });

    dispatch(userSlice.actions.loadUserSuccess(data.user));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.loadUserFailed(error.response.data.message));
  }
};
export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/logout `, {
      withCredentials: true,
    });

    dispatch(userSlice.actions.loginSuccess(data.message));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed(error.response.data.message));
  }
};

export const updatePassword =
  (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    dispatch(userSlice.actions.updatePasswordRequest());
    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/update/password`,
        { currentPassword, newPassword, confirmNewPassword },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      dispatch(userSlice.actions.updatePasswordSuccess(data.message));
      dispatch(userSlice.actions.clearAllError());
    } catch (error) {
      dispatch(
        userSlice.actions.updateProfileFailed(error.response.data.message)
      );
    }
  };

export const updateProfile = (newData) => async (dispatch) => {
  dispatch(userSlice.actions.updateProfileRequest());
  try {
    const { data } = await axios.put(`${BACKEND_URL}/update/me`, newData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' }, //because from data will be comprises  of image/files
    });

    dispatch(userSlice.actions.updateProfileSuccess(data.message));
    dispatch(userSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      userSlice.actions.updateProfileFailed(error.response.data.message)
    );
  }
};

export const resetProfile = () => (dispatch) => {
  dispatch(userSlice.actions.updateProfileResetAfterUpdate());
};

export const clearAllUserError = () => (dispatch) => {
  dispatch(userSlice.actions.clearAllError());
};

export default userSlice.reducer;

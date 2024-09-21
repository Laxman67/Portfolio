import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const BACKEND_URL = 'http://localhost:4000/api/v1/message';

const initialState = {
  loading: false,
  messages: [],
  error: null,
  message: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getAllMessagesRequest(state) {
      state.loading = true;
      state.error = null;
      state.messages = [];
    },
    getAllMessagesSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.messages = action.payload;
    },
    getAllMessagesFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteMessagesRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    deleteMessagesSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteMessagesFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },

    resetMessageSlice(state, action) {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
    clearAllError(state) {
      state.error = null;
    },
  },
});

export const getAllMessages = () => async (dispatch) => {
  dispatch(messagesSlice.actions.getAllMessagesRequest());

  try {
    const { data } = await axios.get(`${BACKEND_URL}/getall`, {
      withCredentials: true,
    });

    dispatch(messagesSlice.actions.getAllMessagesSuccess(data.messages));
    dispatch(messagesSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      messagesSlice.actions.getAllMessagesFailed(error.response.data.message)
    );
  }
};

export const deleteMessage = (id) => async (dispatch) => {
  dispatch(messagesSlice.actions.deleteMessagesRequest());
  try {
    const { data } = await axios.delete(`${BACKEND_URL}/delete/${id}`, {
      withCredentials: true,
    });

    dispatch(messagesSlice.actions.deleteMessagesSuccess(data.message));
    dispatch(messagesSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      messagesSlice.actions.deleteMessagesFailed(error.response.data.message)
    );
  }
};

export const clearAllMessagesError = () => (dispatch) => {
  dispatch(messagesSlice.actions.clearAllError());
};

export const resetMessageSlice = () => (dispatch) => {
  dispatch(messagesSlice.actions.resetMessageSlice());
};

export default messagesSlice.reducer;

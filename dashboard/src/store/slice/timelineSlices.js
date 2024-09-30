import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const BACKEND_URL = `${import.meta.env.VITE_BACKEND_URL}/timeline`;

const initialState = {
  loading: false,
  timeline: [],
  error: null,
  message: null,
};

const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    getAllTimelineRequest(state) {
      state.timeline = [];
      state.loading = true;
      state.error = null;
    },
    getAllTimelineSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.timeline = action.payload;
    },
    getAllTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTimelineRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    deleteTimelineSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    deleteTimelineFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    AddTimelineRequest(state) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    AddTimelineSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    AddTimelineFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },

    resetTimelinelice(state) {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
    clearAllError(state) {
      state.error = null;
    },
  },
});

export const getAllTimeline = () => async (dispatch) => {
  dispatch(timelineSlice.actions.getAllTimelineRequest());

  try {
    const { data } = await axios.get(`${BACKEND_URL}/getall`, {
      withCredentials: true,
    });

    dispatch(timelineSlice.actions.getAllTimelineSuccess(data.timelines));
    dispatch(timelineSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      timelineSlice.actions.getAllTimelineFailed(error.response.data.message)
    );
  }
};

export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(timelineSlice.actions.deleteTimelineRequest());
  try {
    const { data } = await axios.delete(`${BACKEND_URL}/delete/${id}`, {
      withCredentials: true,
    });

    dispatch(timelineSlice.actions.deleteTimelineSuccess(data.message));
    dispatch(timelineSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      timelineSlice.actions.deleteTimelineFailed(error.response.data.message)
    );
  }
};

export const AddNewTimeline = (timelineData) => async (dispatch) => {
  dispatch(timelineSlice.actions.AddTimelineRequest());
  try {
    const { data } = await axios.post(`${BACKEND_URL}/add`, timelineData, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });

    dispatch(timelineSlice.actions.AddTimelineSuccess(data.message));
    dispatch(timelineSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      timelineSlice.actions.AddTimelineFailed(error.response.data.message)
    );
  }
};

export const clearAllTimelineError = () => (dispatch) => {
  dispatch(timelineSlice.actions.clearAllError());
};

export const resetTimelineSlice = () => (dispatch) => {
  dispatch(timelineSlice.actions.resetTimelinelice());
};

export default timelineSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const BACKEND_URL = 'http://localhost:4000/api/v1/project';

const initialState = {
  projects: [],
  loading: false,
  error: null,
  message: null,
  singleProject: {},
};
const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    getAllProjectRequest(state) {
      state.projects = [];
      state.error = null;
      state.loading = true;
    },
    getAllProjectSuccess(state, action) {
      state.projects = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllProjectFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      //   state.projects = state.projects;
    },
    addNewProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewProjectSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    addNewProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    deleteProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteProjectSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    deleteProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    updateProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateProjectSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    updateProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetSlice(state) {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
    clearAllError(state) {
      state.error = null;
      //   state.projects= state.projects
    },
  },
});

export const getAllProjects = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectRequest());
  try {
    const { data } = await axios.get(`${BACKEND_URL}/getall`, {
      withCredentials: true,
    });

    dispatch(projectSlice.actions.getAllProjectSuccess(data.projects));
    dispatch(projectSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      projectSlice.actions.getAllProjectFailed(error.response.data.message)
    );
  }
};
export const addNewProjects = (projectData) => async (dispatch) => {
  dispatch(projectSlice.actions.addNewProjectRequest());
  try {
    const { data } = await axios.post(`${BACKEND_URL}/add`, projectData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    dispatch(projectSlice.actions.addNewProjectSuccess(data.message));
    dispatch(projectSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      projectSlice.actions.addNewProjectFailed(error.response.data.message)
    );
  }
};

export const deleteProjects = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());
  try {
    const { data } = await axios.delete(`${BACKEND_URL}/delete/${id}`, {
      withCredentials: true,
    });

    dispatch(projectSlice.actions.deleteProjectSuccess(data.projects));
    dispatch(projectSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      projectSlice.actions.deleteProjectFailed(error.response.data.message)
    );
  }
};

export const updateProject = (id, updateData) => async (dispatch) => {
  dispatch(projectSlice.actions.updateProjectRequest());
  try {
    const { data } = await axios.put(
      `${BACKEND_URL}/update/${id}`,
      { updateData },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    dispatch(projectSlice.actions.updateProjectSuccess(data.projects));
    dispatch(projectSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      projectSlice.actions.updateProjectFailed(error.response.data.message)
    );
  }
};

export const clearAllProjectSliceError = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllError());
};

export const resetProjectSlice = () => (dispatch) => {
  dispatch(projectSlice.actions.resetSlice());
};

export default projectSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const BACKEND_URL = 'http://localhost:4000/api/v1/softwareapplication';

const initialState = {
  softwareApplicatios: [],
  loading: false,
  error: null,
  message: null,
};
const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    getApplicationSoftwareRequest(state) {
      state.loading = true;
      state.softwareApplicatios = [];
      state.error = null;
    },

    getApplicationSoftwareSuccess(state, action) {
      state.loading = false;
      state.softwareApplicatios = action.payload;
      state.error = null;
    },
    getApplicationSoftwareFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    addNewSoftwareRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewSoftwareSuccess(state, action) {
      state.loading = true;
      state.error = null;
      state.message = action.payload;
    },
    addNewSoftwareFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    deleteSoftwareApplicationRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteSoftwareApplicationSuccess(state, action) {
      state.loading = true;
      state.error = null;
      state.message = action.payload;
    },
    deleteSoftwareApplicationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetApplicationSlice(state) {
      state.error = null;
      state.loading = false;
      state.message = null;
      //   state.skills = state.skills;
    },
    clearAllError(state) {
      state.error = null;
      //   state.skills = state.skills;
    },
  },
});

// Get All Application Software
export const getAllSoftwareApplication = () => async (dispatch) => {
  dispatch(applicationSlice.actions.getApplicationSoftwareRequest());

  try {
    const { data } = await axios.get(`${BACKEND_URL}/getall`, {
      withCredentials: true,
    });
    // TODO
    console.log(data);

    dispatch(
      applicationSlice.actions.getApplicationSoftwareSuccess(
        data.software_application
      )
    );
    dispatch(applicationSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      applicationSlice.actions.getApplicationSoftwareFailed(
        error.response.data.message
      )
    );
  }
};

// Add New Software Application
export const AddNewSoftwareApplication =
  (applicationData) => async (dispatch) => {
    dispatch(applicationSlice.actions.addNewSoftwareRequest());
    try {
      const { data } = await axios.post(`${BACKEND_URL}/add`, applicationData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      dispatch(applicationSlice.actions.addNewSoftwareSuccess(data.message));
      dispatch(applicationSlice.actions.clearAllError());
    } catch (error) {
      dispatch(
        applicationSlice.actions.addNewSoftwareFailed(
          error.response.data.message
        )
      );
    }
  };

// Delete Specific Skill
export const deleteSoftwareApplication = (id) => async (dispatch) => {
  dispatch(applicationSlice.actions.deleteSoftwareApplicationRequest());
  try {
    const { data } = await axios.delete(`${BACKEND_URL}/delete/${id}`, {
      withCredentials: true,
    });

    dispatch(
      applicationSlice.actions.deleteSoftwareApplicationSuccess(data.message)
    );
    dispatch(applicationSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      applicationSlice.actions.deleteSoftwareApplicationFailed(
        error.response.data.message
      )
    );
  }
};

export const clearAllApplicationSliceError = () => async (dispatch) => {
  dispatch(applicationSlice.actions.clearAllError());
};
export const resetApplicationSoftwareSlice = () => async (dispatch) => {
  dispatch(applicationSlice.actions.resetApplicationSlice());
};

export default applicationSlice.reducer;

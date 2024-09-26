import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const BACKEND_URL = 'http://localhost:4000/api/v1/skill';

const initialState = {
  loading: false,
  skills: [],
  error: null,
  message: null,
};

const skillSlice = createSlice({
  name: 'skill',
  initialState,
  reducers: {
    getAllSkillsRequest(state) {
      state.loading = true;
      state.skills = [];
      state.error = null;
    },

    getAllSkillsSuccess(state, action) {
      state.loading = false;
      state.skills = action.payload;
      state.error = null;
    },
    getAllSkillsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    addNewSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewSkillSuccess(state, action) {
      state.loading = true;
      state.error = null;
      state.message = action.payload;
    },
    addNewSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    deleteSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteSkillSuccess(state, action) {
      state.loading = true;
      state.error = null;
      state.message = action.payload;
    },
    deleteSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    updateSkillRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateSkillSuccess(state, action) {
      state.loading = true;
      state.error = null;
      state.message = action.payload;
    },
    updateSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetSkillSlice(state) {
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

// Get All Skill
export const getAllSkills = () => async (dispatch) => {
  dispatch(skillSlice.actions.getAllSkillsRequest());

  try {
    const { data } = await axios.get(`${BACKEND_URL}/getall`, {
      withCredentials: true,
    });

    dispatch(skillSlice.actions.getAllSkillsSuccess(data.skills));
    dispatch(skillSlice.actions.clearAllError());
  } catch (error) {
    dispatch(
      skillSlice.actions.getAllSkillsFailed(error.response.data.message)
    );
  }
};

// Add New Skills
export const AddNewSkill = (skillData) => async (dispatch) => {
  dispatch(skillSlice.actions.addNewSkillRequest());
  try {
    const { data } = await axios.post(`${BACKEND_URL}/add`, skillData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    dispatch(skillSlice.actions.addNewSkillSuccess(data.message));
    dispatch(skillSlice.actions.clearAllError());
  } catch (error) {
    dispatch(skillSlice.actions.addNewSkillFailed(error.response.data.message));
  }
};

// Delete Specific Skill
export const deleteSkill = (id) => async (dispatch) => {
  dispatch(skillSlice.actions.deleteSkillRequest());
  try {
    const { data } = await axios.delete(`${BACKEND_URL}/delete/${id}`, {
      withCredentials: true,
    });

    dispatch(skillSlice.actions.deleteSkillSuccess(data.message));
    dispatch(skillSlice.actions.clearAllError());
  } catch (error) {
    dispatch(skillSlice.actions.deleteSkillFailed(error.response.data.message));
  }
};
export const updateSkill = (id, proficiency) => async (dispatch) => {
  dispatch(skillSlice.actions.updateSkillRequest());
  try {
    const { data } = await axios.put(
      `${BACKEND_URL}/update/${id}`,
      { proficiency },
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      }
    );

    dispatch(skillSlice.actions.updateSkillSuccess(data.message));
    dispatch(skillSlice.actions.clearAllError());
  } catch (error) {
    dispatch(skillSlice.actions.updateSkillFailed(error.response.data.message));
  }
};

export const clearAllSkillError = () => async (dispatch) => {
  dispatch(skillSlice.actions.clearAllError());
};
export const resetSkillSlice = () => async (dispatch) => {
  dispatch(skillSlice.actions.resetSkillSlice());
};

export default skillSlice.reducer;

import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import API from '../api/index.js';

export const fetchCourses = createAsyncThunk("courses", async () => {
  return fetch("api/courses").then((res) => {
    const json = res.json();
    return json.data;
  });
});

export const addCourse = createAsyncThunk("courses", async (payload) => {
  return API.postJson("api/courses", payload).then((res) => res.json())
});

export const removeCourse = createAsyncThunk("courses/removeCourse", async (id) => {
  return fetch(`api/courses/${id}`, {method: "DELETE"}).then((res) => res.json());
})

export const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    loading: false,
    list: [],
    hasError: false,
  },
  reducers: {
  
  },
  extraReducers: {
    [fetchCourses.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCourses.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.list = payload;
    },
    [fetchCourses.rejected]: (state, { payload }) => {
      state.loading = false;
      state.hasError = true;
    },
    [addCourse.fulfilled]: (state, { payload }) => {
      if (payload && payload.id) {
        state.list.unshift(payload);
        state.loading = false
        state.hasError = false
      }
    },
    [removeCourse.fulfilled]: (state, { payload: { id } }) => {
      if (id) {
        state.list = state.list.filter((i) => i.id !== id);
        state.loading = false
        state.hasError = false
      }
    }
  }
});

export default coursesSlice.reducer;

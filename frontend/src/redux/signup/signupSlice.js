import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  successMessage: null,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.successMessage = action.payload;
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },
    signupReset: (state) => {
      state.loading = false;
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const { signupStart, signupSuccess, signupFailure, signupReset } =
  signupSlice.actions;

export default signupSlice.reducer;

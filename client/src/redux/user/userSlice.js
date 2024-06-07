import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signinFailuer: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { signinFailuer, signinSuccess, signinStart } = userSlice.actions;

export default userSlice.reducer;

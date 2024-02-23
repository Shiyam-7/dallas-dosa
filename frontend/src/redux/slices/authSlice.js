import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, user: null },
  reducers: {
    login: (state, action) => {
      const { accessToken, user } = action.payload;
      state.token = accessToken;
      state.user = user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

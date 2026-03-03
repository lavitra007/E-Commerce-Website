import { createSlice } from "@reduxjs/toolkit";
import { setToken, removeToken } from "../../utils/token";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      setToken("dummy-token"); // placeholder
    },
    logout: (state) => {
      state.user = null;
      removeToken();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
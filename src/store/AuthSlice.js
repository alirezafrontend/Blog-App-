import { createSlice } from "@reduxjs/toolkit";

const storedAuth = (() => {
  try {
    return JSON.parse(localStorage.getItem("userAuth"));
  } catch {
    return null;
  }
})();

const initialAuth = storedAuth || {
  authUser: false,
  user: {},
  tokenUser: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    login: (state, action) => {
      const { name, userId } = action.payload;

      state.authUser = true;
      state.user = { name, userId };
      state.tokenUser = Math.random().toString(36).substring(2, 18);

      localStorage.setItem(
        "userAuth",
        JSON.stringify({
          authUser: state.authUser,
          user: state.user,
          tokenUser: state.tokenUser,
        })
      );
    },
    logOut: (state) => {
      state.authUser = false;
      state.user = {};
      state.tokenUser = "";

      localStorage.removeItem("userAuth");
    },
  },
});

export const { login, logOut } = authSlice.actions;
export default authSlice.reducer;

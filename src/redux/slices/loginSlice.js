import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userInfo: {
    firstName: "",
    lastName: "",
    nationalCode: "",
    grade: "",
    schoolName: "",
    username: "",
  },
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("inside login store");
      state.isLoggedIn = true;
      state.userInfo = action.payload; // Payload contains userInfo
    },
    logout: (state) => {
      console.log("inside logout store");
      state.isLoggedIn = false;
      state.userInfo = initialState.userInfo;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;

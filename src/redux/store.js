import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../redux/slices/loginSlice";
import elearningReducer from "../redux/slices/elearningSlice";

const initialState = {
  sidebarShow: true,
  theme: "light",
};

export const store = configureStore({
  reducer: {
    login: loginReducer,
    elearningState: elearningReducer,
  },
});

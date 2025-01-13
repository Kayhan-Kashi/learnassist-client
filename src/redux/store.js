import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../redux/slices/loginSlice";
import sideBarReducer from "../redux/slices/elearningSlice";

const initialState = {
  sidebarShow: true,
  theme: "light",
};

export const store = configureStore({
  reducer: {
    login: loginReducer,
    sideBarState: sideBarReducer,
  },
});

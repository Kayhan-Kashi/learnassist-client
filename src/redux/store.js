import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../redux/slices/loginSlice";

const initialState = {
  sidebarShow: true,
  theme: "light",
};

export const store = configureStore({
  reducer: {
    login: loginReducer,
    changeState: (state = initialState, { type, ...rest }) => {
      switch (type) {
        case "set":
          return { ...state, ...rest };
        default:
          return state;
      }
    },
  },
});

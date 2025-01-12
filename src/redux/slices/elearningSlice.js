import { legacy_createStore as createStore } from "redux";

const initialState = {
  sidebarShow: true,
  theme: "light",
};

export const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

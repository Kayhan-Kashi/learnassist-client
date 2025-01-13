import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: true,
  theme: "light",
};

const elearningSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    sideBarState: (state, action) => {
      const { type, ...rest } = action.payload;
      switch (type) {
        case "set":
          return { ...state, ...rest };
        default:
          return state;
      }
    },
    timeClicked: (state, action) => {
      state.timeClicked = action.payload;
    },
  },
});

export const { sideBarState, timeClicked } = elearningSlice.actions;
export default elearningSlice.reducer;

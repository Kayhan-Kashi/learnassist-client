import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: true,
  theme: "light",
};

const elearningSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    setSideBarState: (state, action) => {
      const { type, ...rest } = action.payload;
      switch (type) {
        case "set":
          return { ...state, ...rest };
        default:
          return state;
      }
    },
    setVideoTimeStoped: (state, action) => {
      state.timeClicked = action.payload;
    },
  },
});

export const { setSideBarState, setVideoTimeStoped } = elearningSlice.actions;
export default elearningSlice.reducer;

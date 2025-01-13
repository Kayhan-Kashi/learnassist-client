import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: true,
  theme: "light",
};

const sideBarSlice = createSlice({
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
  },
});

export const { sideBarState } = sideBarSlice.actions;
export default sideBarSlice.reducer;

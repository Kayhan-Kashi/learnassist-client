import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: true,
  theme: "light",
  courseVideos: {},
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
    updateLastSeenCourseVideoTime: (state, action) => {
      const { courseVideoId, time } = action.payload;
      if (!state.courseVideos[courseVideoId]) {
        state.courseVideos[courseVideoId] = { lastSeenTime: 0 };
      }
      alert("inside redux");
      alert(JSON.stringify(state));
      state.courseVideos[courseVideoId].lastSeenTime = time;
    },
  },
});

export const {
  setSideBarState,
  setVideoTimeStoped,
  updateLastSeenCourseVideoTime,
} = elearningSlice.actions;
export default elearningSlice.reducer;

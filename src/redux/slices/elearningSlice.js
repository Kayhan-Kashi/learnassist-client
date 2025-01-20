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
    setCourseVideoWatch: (state, action) => {
      const { courseVideoId, courseVideoWatchId } = action.payload;
      state.courseVideos[courseVideoId] = {
        courseVideoWatchId: courseVideoWatchId,
      };
    },
    setCourseVideoSessionTime: (state, action) => {
      const { courseVideoId, lastMomentSeen, watchSessionId } = action.payload;
      if (!state.courseVideos[courseVideoId]) {
        state.courseVideos[courseVideoId] = {
          lastMomentSeen: 0,
          watchSessionId: watchSessionId,
        };
      }
      alert("inside redux");
      alert(JSON.stringify(state));
      state.courseVideos[courseVideoId] = {
        lastMomentSeen: lastMomentSeen,
        watchSessionId: watchSessionId,
      };
      // state.courseVideos[courseVideoId].lastMomentSeen = lastMomentSeen;
    },
  },
});

export const {
  setSideBarState,
  setVideoTimeStoped,
  setCourseVideoWatch,
  setCourseVideoSessionTime,
} = elearningSlice.actions;
export default elearningSlice.reducer;

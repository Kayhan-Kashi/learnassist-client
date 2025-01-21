import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: true,
  theme: "light",
  helpMeTime: "0:0",
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
    setHelpMeTime: (state, action) => {
      const { courseVideoId, helpMeTime } = action.payload;
      state.currentVideoHelpMeTime = helpMeTime;
      state.courseVideos[courseVideoId] = {
        ...state.courseVideos[courseVideoId],
        helpMeTime,
      };
    },
    setCourseVideoWatchData: (state, action) => {
      const { courseVideoId, courseVideoWatchId } = action.payload;
      state.courseVideos[courseVideoId] = {
        ...state.courseVideos[courseVideoId],
        courseVideoWatchId,
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
      state.courseVideos[courseVideoId] = {
        ...state.courseVideos[courseVideoId],
        lastMomentSeen: lastMomentSeen,
        watchSessionId: watchSessionId,
      };
    },
  },
});

export const {
  setSideBarState,
  setHelpMeTime,
  setCourseVideoWatchData,
  setCourseVideoSessionTime,
} = elearningSlice.actions;
export default elearningSlice.reducer;

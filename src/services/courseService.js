import axios from "axios";
import { getJWTHeader } from "./authService";

const API_BASE_URL = "https://learnassist.ir/api/v1/CourseRegistration";

export const isCourseRegistered = async ({ courseId }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        isCourseRegistered: false, // Simulating the C# object
      });
    }, 1000); // Simulate network delay
  });
  //   const authHeaders = getJWTHeader();
  //   if (authHeaders)
  //     return await axios.post(`${API_BASE_URL}/IsCourseRegistered`, courseId, {
  //       authHeaders,
  //     });
  //   return null;
};

export const registerCourse = async ({ courseId }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        courseRegistrationId: "1234-123-3232-2323", // Simulating the C# object
      });
    }, 1000); // Simulate network delay
  });
  //   const authHeaders = getJWTHeader();
  //   if (authHeaders)
  //     return await axios.post(`${API_BASE_URL}/IsCourseRegistered`, courseId, {
  //       authHeaders,
  //     });
  //   return null;
};

export const startWatchCourseVideo = async ({ courseVideoId }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        CourseVideoWatchId: "courseWatchId-123-3232-2323",
      });
    }, 1000);
  });
  // const authHeaders = getJWTHeader();
  // if (authHeaders)
  //   return await axios.post(`${API_BASE_URL}/StartCourseVideoWatch`, courseId, {
  //     authHeaders,
  //   });
  // return null;
};

export const updateCourseVideoSession = async (
  courseWatchVideoId,
  lastTimeSeen,
  courseSessionWatchId
) => {
  if (courseSessionWatchId) {
    alert("inside service real");
    alert(courseSessionWatchId);
    alert(courseWatchVideoId);
    alert(JSON.stringify(lastTimeSeen));
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          courseVideoWatchSessionId: "watchSession-123-3232-2323",
        });
      }, 1000);
    });
  } else {
    alert("inside service else");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          courseVideoWatchSessionId: "watchSession-123-3232-2323",
        });
      }, 1000);
    });
  }
  // const authHeaders = getJWTHeader();
  // if (authHeaders)
  //   return await axios.post(`${API_BASE_URL}/StartCourseVideoWatch`, courseId, {
  //     authHeaders,
  //   });
  // return null;
};

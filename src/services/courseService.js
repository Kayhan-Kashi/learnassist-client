import axios from "axios";
import { getJWTHeader, getUserInfoFromJWT } from "./authService";
import { API_BASE_URL } from "./baseUrl";

const COURSE_API_URL = `${API_BASE_URL}/CourseWatch`;

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
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       CourseVideoWatchId: "courseWatchId-123-3232-2323",
  //     });
  //   }, 1000);
  // });
  const authHeaders = getJWTHeader();
  console.log("Auth Headers:", authHeaders);
  if (authHeaders)
    return await axios.post(
      `${COURSE_API_URL}/StartCourseVideoWatch`,
      { courseVideoId },
      {
        headers: authHeaders,
      }
    );
  return null;
};

export const createCourseVideoSession = async ({
  courseVideoWatchId,
  watchDurationInSeconds,
  lastMomentSeen,
}) => {
  const authHeaders = getJWTHeader();
  if (authHeaders)
    return await axios.post(
      `${COURSE_API_URL}/CreateWatchSession`,
      {
        courseVideoWatchId,
        watchDurationInSeconds,
        lastMomentSeen,
      },
      {
        headers: authHeaders,
      }
    );
  return null;
};

export const updateCourseVideoSession = async ({
  courseVideoWatchId,
  watchDurationInSeconds,
  lastMomentSeen,
  courseSessionWatchId,
}) => {
  if (courseSessionWatchId) {
    const authHeaders = getJWTHeader();
    if (authHeaders) {
      return await axios.put(
        `${COURSE_API_URL}/UpdateWatchSession`,
        {
          courseVideoWatchId: courseVideoWatchId,
          CourseVideoSessionId: courseSessionWatchId,
          watchDurationInSeconds,
          lastMomentSeen,
        },
        {
          headers: authHeaders,
        }
      );
    }
  }
  return null;
};

export const getCourseVideoById = async ({ courseVideoId }) => {
  const authHeaders = getJWTHeader();
  if (authHeaders) {
    return await axios.get(
      `${API_BASE_URL}/ELearning/GetCourseVideoById/${courseVideoId}`,
      {
        headers: authHeaders,
      }
    );
  }
  return null;
};

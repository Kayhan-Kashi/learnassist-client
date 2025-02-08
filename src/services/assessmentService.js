import axios from "axios";
import { getJWTHeader } from "./authService";
import { API_BASE_URL } from "./baseUrl";

const ASSESSMENT_API_URL = `${API_BASE_URL}/CourseAssessment`;
const USER_ASSESSMENT_API_URL = `${API_BASE_URL}/CourseUserAssessment`;

export const getCourseAssessment = async ({ courseAssessmentId }) => {
  const authHeaders = getJWTHeader();
  if (authHeaders) {
    return await axios.get(`${ASSESSMENT_API_URL}/${courseAssessmentId}`, {
      headers: authHeaders,
    });
  }
  return null;
};

export const createCourseAssessment = async ({
  CourseAssessmentId,
  QuestionAnswer,
}) => {
  const authHeaders = getJWTHeader();
  if (authHeaders)
    return await axios.post(
      `${USER_ASSESSMENT_API_URL}/CreateCourseUserAssessment`,
      {
        CourseAssessmentId,
        QuestionAnswer,
      },
      {
        headers: authHeaders,
      }
    );
  return null;
};

export const checkUserAssessment = async ({ courseAssessmentId }) => {
  const authHeaders = getJWTHeader();
  if (authHeaders)
    return await axios.get(`${USER_ASSESSMENT_API_URL}/${courseAssessmentId}`, {
      headers: authHeaders,
    });
  return null;
};

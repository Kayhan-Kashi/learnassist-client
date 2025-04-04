import axios from "axios";
import { API_BASE_URL } from "./baseUrl";
import { getJWTHeader } from "./authService";

const CHAT_API_URL = `${API_BASE_URL}/Chat`;

// Configure your API endpoint and headers
const API_URL = "https://api.openai.com/v1/chat/completions"; // Update this based on the specific endpoint
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
// Function to interact with ChatGPT API
export const callChatGPT = async (messages) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo", // Replace with your model if needed
        messages: messages,
        temperature: 0.7, // Adjust the creativity level
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SECRET_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error calling ChatGPT API:", error);
    throw error;
  }
};

export const sendPrompt = async ({
  prompt,
  helpNeeded,
  courseVideoWatchId,
  time,
}) => {
  const authHeaders = getJWTHeader();
  if (authHeaders) {
    return await axios.post(
      `${CHAT_API_URL}/sendPrompt`,
      {
        prompt,
        helpNeeded,
        courseVideoWatchId,
        time,
      },
      {
        headers: authHeaders,
      }
    );
  }

  return null;
};

export const sendAnswer = async ({
  prompt,
  helpNeeded,
  courseVideoWatchId,
  question,
}) => {
  const finalAnswer =
    "جواب سوال " +
    " با شماره " +
    question.questionNo +
    " " +
    "می شود : " +
    ' " ' +
    prompt +
    '" ';
  const authHeaders = getJWTHeader();
  if (authHeaders) {
    return await axios.post(
      `${CHAT_API_URL}/sendPrompt`,
      {
        prompt: finalAnswer,
        helpNeeded,
        courseVideoWatchId,
        isAnswer: true,
      },
      {
        headers: authHeaders,
      }
    );
  }

  return null;
};

export const GetChatDialogues = async ({ courseVideoWatchId }) => {
  const authHeaders = getJWTHeader();
  if (authHeaders) {
    return await axios.post(
      `${CHAT_API_URL}/GetUserDialogues`,
      {
        CourseVideoWatchId: courseVideoWatchId,
      },
      {
        headers: authHeaders,
      }
    );
  }
  return null;
};

export const HelpMe = async (time) => {};

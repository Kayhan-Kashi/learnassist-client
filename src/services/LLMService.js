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
}) => {
  const authHeaders = getJWTHeader();
<<<<<<< HEAD
=======
  console.log("Auth Headers:", authHeaders);
>>>>>>> 5c4ae82ffd01383b0b03e420223cfbab36b2c66b
  if (authHeaders) {
    return await axios.post(
      `${CHAT_API_URL}/sendPrompt`,
      {
        prompt,
        helpNeeded,
        courseVideoWatchId,
      },
      {
        headers: authHeaders,
      }
    );
  }

  return null;
<<<<<<< HEAD
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
=======

  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       answer: "این جواب است", // Simulating the C# object
  //     });
  //   }, 1000); // Simulate network delay
  // });
>>>>>>> 5c4ae82ffd01383b0b03e420223cfbab36b2c66b
};

export const HelpMe = async (time) => {};

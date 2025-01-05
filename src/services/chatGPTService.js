import axios from "axios";

// Configure your API endpoint and headers
const API_URL = "https://api.openai.com/v1/chat/completions"; // Update this based on the specific endpoint
const SECRET_KEY = "";

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

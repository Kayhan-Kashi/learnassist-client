import axios from "axios";

const API_BASE_URL = "https://learnassist.ir/api/v1";

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

export const sendPrompt = async (prompt, helpNeeded, currentTime) => {
  // alert(JSON.stringify(prompt));
  //alert(JSON.stringify(helpNeeded));
  // alert(JSON.stringify(currentTime));

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        answer: "این جواب است", // Simulating the C# object
      });
    }, 1000); // Simulate network delay
  });
  // return await axios.post(`${API_BASE_URL}/sendPrompt`, prompt);
};

export const HelpMe = async (time) => {};

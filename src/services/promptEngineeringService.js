import axios from "axios";
import { getJWTHeader } from "./authService";
import { API_BASE_URL } from "./baseUrl";

const PROMPT_API_URL = `${API_BASE_URL}/PromptEngineering`;

export const GetGeneralPromptEngineering = async () => {
  const authHeaders = getJWTHeader();
  if (authHeaders) {
    return await axios.get(`${PROMPT_API_URL}/GetGeneralPromptEngineering`, {
      headers: authHeaders,
    });
  }
  return null;
};

export const createPromptEngineering = async ({ prompt, orderNo }) => {
  const authHeaders = getJWTHeader();
  if (authHeaders) {
    return await axios.post(
      `${PROMPT_API_URL}/CreatePromptEngineering`,
      { prompt, orderNo },
      {
        headers: authHeaders,
      }
    );
  }
  return null;
};

export const updatePromptEngineering = async ({ id, prompt, orderNo }) => {
  const authHeaders = getJWTHeader();
  if (authHeaders) {
    return await axios.put(
      `${PROMPT_API_URL}/UpdatePromptEngineering`,
      { id, prompt, orderNo },
      {
        headers: authHeaders,
      }
    );
  }
  return null;
};

export const deletePromptEngineering = async ({ id, prompt, orderNo }) => {
  const authHeaders = getJWTHeader();
  if (authHeaders) {
    alert(JSON.stringify({ id, prompt, orderNo }));
    return await axios.delete(
      `${PROMPT_API_URL}/DeletePromptEngineering/${id}`,
      {
        headers: authHeaders,
      }
    );
  }
  return null;
};

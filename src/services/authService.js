import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

const isUsernameValid = async(userData) => {
  return await axios.post(`${API_BASE_URL}/posts`, {
    title: "foo",
    body: "bar",
    userId: 1,
  });
}

const register = async (userData) => {
  // return await axios.post(`${API_BASE_URL}/posts`, userData);
  return await axios.post(`${API_BASE_URL}/posts`, {
    title: "foo",
    body: "bar",
    userId: 1,
  });
};

const login = async (userData) => {
  // return await axios.post(`${API_BASE_URL}/posts`, userData);
  return await axios.post(`${API_BASE_URL}/posts`, {
    title: "foo",
    body: "bar",
    userId: 1,
  });
};

export const registerUser = register;
export const loginUser = login;
export const validateUsername = isUsernameValid;

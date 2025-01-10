import axios from "axios";

const API_BASE_URL = "https://learnassist.ir/api/v1/Users";
//const API_BASE_URL = "http://82.115.19.79:5000/v1/Users";

const isUsernameValid = async (userData) => {
  return await axios.post(`${API_BASE_URL}/posts`, {
    title: "foo",
    body: "bar",
    userId: 1,
  });
};

const register = async (userData) => {
  // return await axios.post(`${API_BASE_URL}/posts`, userData);
  return await axios.post(`${API_BASE_URL}/register`, {
    email: userData.username,
    password: userData.password,
  });
};

const login = async (userData) => {
  return await axios.post(`${API_BASE_URL}/login`, {
    email: userData.username,
    password: userData.password,
  });
};

export const getAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  return token || null;
};

export const getUserInfo = () => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return null;
};

export const logoutFromStorage = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("accessToken");
  window.location.href = "/";
};

export const registerUser = register;
export const loginUser = login;
export const validateUsername = isUsernameValid;

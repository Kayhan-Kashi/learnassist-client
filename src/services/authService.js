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

export const loginUser = async (userData) => {
  return await axios.post(`${API_BASE_URL}/login`, {
    username: userData.username,
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

export const isUserExisted = async (username) => {
  alert(JSON.stringify(username));
  return await axios.post(`${API_BASE_URL}/IsUserExisted`, username);
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       IsUserExisted: false, // Simulating the C# object
  //     });
  //   }, 1000); // Simulate network delay
  // });
};

export const registerUser = async (registerData) => {
  console.log(JSON.stringify({ registerData }));
  alert(JSON.stringify({ registerData }));
  return await axios.post(`${API_BASE_URL}/register`, registerData);
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       isSuccessfull: true, // Simulating the C# object
  //     });
  //   }, 1000); // Simulate network delay
  // });
};

export const getJWTHeader = () => {
  const jwtToken = getAccessToken();
  if (jwtToken) {
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json", // Adjust content type as needed
    };
    return headers;
  }
  return null;
};

export const validateUsername = isUsernameValid;

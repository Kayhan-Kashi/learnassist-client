import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "./baseUrl";

const AUTH_BASE_URL = `${API_BASE_URL}/Users`;

//const API_BASE_URL = "http://82.115.19.79:5000/v1/Users";

const COURSE_EDITOR_ROLE = "learnassist_course_editor";
const CONTROL_GROUP_ROLE = "control_group";

const isUsernameValid = async (userData) => {
  return await axios.post(`${AUTH_BASE_URL}/posts`, {
    title: "foo",
    body: "bar",
    userId: 1,
  });
};

export const loginUser = async (userData) => {
  return await axios.post(`${AUTH_BASE_URL}/login`, {
    username: userData.username,
    password: userData.password,
  });
};

export const getAccessToken = () => {
  const token = localStorage.getItem("accessToken");
  return token || null;
};

export const getUserInfo = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    const decodedToken = jwtDecode(token);
    //console.log(JSON.stringify(decodedToken));
    const userRoles = decodedToken.realm_access.roles;
    const firstname = decodedToken.given_name;
    const lastname = decodedToken.family_name;
    const username = decodedToken.preferred_username;
    const isLoggedIn = true;
    return { firstname, lastname, username, userRoles, isLoggedIn };
  }

  return null;

  // const userInfo = localStorage.getItem("userInfo");
  // if (userInfo) {
  //   return JSON.parse(userInfo);
  // }
  // return null;
};

export const is_User_course_editor = () => {
  const roles = getUserRoles();
  if (roles) {
    return roles.includes(COURSE_EDITOR_ROLE);
  }

  return null;
};

export const is_control_group = () => {
  const roles = getUserRoles();
  if (roles) {
    return roles.includes(CONTROL_GROUP_ROLE);
  }

  return null;
};

export const getUserRoles = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    const decodedToken = jwtDecode(token);
    const userRoles = decodedToken.realm_access.roles;
    return userRoles;
  }

  return null;
};

export const logoutFromStorage = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("accessToken");
  window.location.href = "/login";
};

export const isTokenExpired = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return null;
  }
  const decodedToken = jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
  //const currentTime = Math.floor(Date.now() * 1000); // Convert milliseconds to seconds

  const isTokenExpired = decodedToken.exp < currentTime;
  return isTokenExpired;
};

export const isUserExisted = async (username) => {
  return await axios.post(`${AUTH_BASE_URL}/IsUserExisted`, username);
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       IsUserExisted: false, // Simulating the C# object
  //     });
  //   }, 1000); // Simulate network delay
  // });
};

export const registerUser = async (registerData) => {
  //console.log(JSON.stringify({ registerData }));
  return await axios.post(`${AUTH_BASE_URL}/register`, registerData);
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
  if (jwtToken && !isTokenExpired()) {
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json", // Adjust content type as needed
    };
    return headers;
  }
  logoutFromStorage();
  return null;
};

// export const getJWTHeader = () => {
//   const jwtToken = getAccessToken();
//   alert(jwtToken);
//   if (jwtToken) {
//     const headers = {
//       Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJJNDl0WlFKaF9vaWhLOXdGR3k3ejlYSVpTczZBSm0tTXJiSG1Gci1ZVF9jIn0.eyJleHAiOjE3Mzc0OTM3MzcsImlhdCI6MTczNzQ5MDEzNywianRpIjoiYTEyMDFkMTUtMjQzNC00NjcyLThlMTctNzdhNWI3NDllZDRkIiwiaXNzIjoiaHR0cDovL2xlYXJuYXNzaXN0LWlkcDo4MDgwL3JlYWxtcy9sZWFybmFzc2lzdCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIyMDA1OTU0OC1jMmYwLTQyMzUtODBmOC01NDhiNTAyNGMyYmYiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJsZWFybmFzc2lzdC1hdXRoLWNsaWVudCIsInNpZCI6ImM1ZjBjZmUzLTFiZGQtNGVkYy1iZTMyLTEzNjJmZWZjZTlkMyIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1sZWFybmFzc2lzdCIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiLaqdmI2LTYp9mGINqp2KfYtNuMIiwicHJlZmVycmVkX3VzZXJuYW1lIjoia29vc2hhbi5rYXNoaSIsImdpdmVuX25hbWUiOiLaqdmI2LTYp9mGIiwiZmFtaWx5X25hbWUiOiLaqdin2LTbjCJ9.rTOLcnfgl712ZGrRT7WjmW15dc8oHWUMQYk7E0DVkPEJDZmBw8V2yHchyoyJbZhB6yug0LIfhGiieX1IG51RDn8daTCrlz1V-XXfcqJgpjVYMHGga4gWaepczkwPKTLLK8AK5wehtj1vkmvMOxK1cf97hPVgooY2iaF3pe7CBxKLyza3Hwx5Pmyl9-HMmBec_uPQNjlBwpT83Gy8s-HQCTXuEar24fCqNGLF6EoiJT7hlfMsmJonUo_3WWLdF3vCxHaqwMOwOBaAQqWu8AzVDWXTmVbim6qVaePnIkt7dbE3D6hv4vIu1Fq_0sgrLFr5m1zm4BR8LypW9PDPPZYM3Q`,
//"Content-Type": "application/json", // Adjust content type as needed
//     };
//     alert(JSON.stringify(headers));
//     return headers;
//   }
//   return null;
// };

export const validateUsername = isUsernameValid;

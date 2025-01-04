import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Router } from "react-router-dom";
import Layout from "./components/publicModule/Layout/Layout";
import Courses from "./components/publicModule/Courses/Courses";
import Login from "./components/publicModule/pages/Login";
import Register from "./components/publicModule/pages/Register";
import UserInfoForm from "./components/publicModule/pages/UserInfoForm";
import { store } from "../src/redux/store"; // Import your Redux store
import { Provider } from "react-redux";



function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/courses" element={<Courses />}></Route>
          <Route path="/contact-us" element={<Layout />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/userInfo" element={<UserInfoForm />}></Route>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Router } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Courses from "./components/Courses/Courses";
import Login from "./components/Profile/Login";
import Register from "./components/Profile/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/contact-us" element={<Layout />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Route>
    </Routes>
  );
}

export default App;

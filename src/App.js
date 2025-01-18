import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { store } from "../src/redux/store"; // Import your Redux store
import "./App.css";
import DefaultLayout from "./components/e-learningModule/Layout/DefaultLayout";
import Courses from "./components/publicModule/Courses/Courses";
import Layout from "./components/publicModule/Layout/Layout";
import Login from "./components/publicModule/pages/Login";
import Register from "./components/publicModule/pages/Register";
import UserInfoForm from "./components/publicModule/pages/UserInfoForm";
import WatchAndAskComponent from "./components/e-learningModule/WatchAndAskComponent/WatchAndAskComponent";
import Assessment from "./components/e-learningModule/Assessment/Assessment";
import Dashboard from "./components/e-learningModule/Dashboard/Dashboard";
import Profile from "./components/e-learningModule/Profile/Profile";

// const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

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
        <Route path="/elearning" element={<DefaultLayout />}>
          <Route
            path="/elearning/watch-course/:courseVideoId"
            element={<WatchAndAskComponent />}
          ></Route>
          <Route
            path="/elearning/assessment/1-1"
            element={<Assessment />}
          ></Route>
          <Route path="/elearning/Dashboard" element={<Dashboard />}></Route>
          <Route path="/elearning/profile/1" element={<Profile />}></Route>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;

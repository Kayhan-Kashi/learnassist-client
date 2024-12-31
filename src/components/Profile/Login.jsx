import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../../assets/login-vector-transformed.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { loginUser } from "../../services/authService";
import { login as loginAction } from "../../redux/slices/loginSlice";

import { getAccessToken } from "../../services/authService";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "نام کاربری باید وارد باشد")
    .nonempty("ورود نام کاربری الزامی است"),
  password: z.string().min(1, "رمز عبور باید وارد شود"),
});

const Login = () => {
  const [formUserData, setFormUserData] = useState({
    firstName: "",
    lastName: "",
    nationalCode: "",
    grade: "",
    schoolName: "",
    username: "",
  });

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [passToggle, setPassToggle] = useState(false);

  // const togglePasswordVisibility = () => {
  //   setPasswordVisible(!passwordVisible);
  // };

  const togglePassword = () => {
    setPassToggle(!passToggle);
  };

  const userInfo = useSelector((state) => state.login.userInfo);

  const login = (formData) => {
    setLoading(true);
    loginUser({ username: formData.email, password: formData.password })
      .then((response) => {
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            username: "kayhan.kashi",
            firstname: "کیهان",
            lastname: "کاشی",
            isLoggedIn: true,
          })
        );
        dispatch(loginAction(formData));

        toast.success("ورود با موفقیت انجام شد", {
          position: "top-center",
          autoClose: 500,
          style: { fontSize: "14px", padding: "10px" },
          onClose: () => {
            setLoading(false);
            navigate("/");
          },
        });
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        setLoading(false);
        console.log(err.message);
        toast.error("ورود  انجام نشد", {
          position: "top-center",
          autoClose: 1000,
          style: { fontSize: "14px", padding: "10px" },
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>ورود - LearnAssist</title>
        <meta
          name="description"
          content="login an account for learnAssist web application"
        />
      </Helmet>
      <div
        className="bg-cover bg-center h-screen flex justify-center items-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="w-3/5 bg-slate-800 border border-slate-400 rounded-md md:p-20 sm:shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative ">
          <ToastContainer />
          <div>
            <h1 className="text-5xl font-bold text-white mb-6 text-center mt-5">
              ورود
            </h1>
            <form
              action=""
              className="flex flex-col"
              onSubmit={handleSubmit(login)}
            >
              <div className="flex flex-col sm:flex-row my-4 relative">
                <label
                  className={`sm:flex-[1_1_20%] text-white sm:text-sm md:text-lg text-center sm:text-right pr-5 whitespace-nowrap flex-shrink-0`}
                >
                  نام کاربری <span className={"hidden sm:inline"}>:</span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className={`flex-[1_1_60%] py-2.3 px-2 
                    text-sm sm:text-xl text-white font-bold
                    bg-transparent border-0 border-b-2 border-gray-300 
                    appearance-none dark:focus:border-blue-500 
                    focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer`}
                />
                {/* <BiUser className="absolute top-0 right-4" /> */}
                <div className="flex-[4_1_20%]"></div>
              </div>
              {errors.email && (
                <p className="text-red-600 text-lg text-center">
                  {errors.email.message}
                </p>
              )}
              <div className="flex flex-col sm:flex-row my-4 relative">
                <label
                  className={`flex-[1_1_20%] text-white sm:text-sm md:text-lg text-center sm:text-right pr-5 whitespace-nowrap flex-shrink-0`}
                >
                  رمز عبور <span className={"hidden sm:inline"}>:</span>
                </label>
                <input
                  type={passToggle ? "text" : "password"}
                  {...register("password")}
                  className={`flex-[4_1_50%] py-2.3 px-2 
                      text-sm sm:text-xl text-white font-bold
                      bg-transparent border-0 border-b-2 border-gray-300 
                      appearance-none dark:focus:border-blue-500 
                      focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer`}
                  placeholder=""
                />

                <button
                  type="button"
                  onClick={togglePassword}
                  className="hidden lg:block absolute top-3 sm:right-20 focus:outline-none text-white "
                >
                  {passToggle ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
                <div className="flex-[4_1_20%]"></div>
              </div>
              {errors.password && (
                <p className="text-red-600 text-lg text-center">
                  {errors.password.message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`block w-full h-12 text-2xl mb-4 
                  mt-6 rounded-full bg-white text-emerald-800
                   hover:bg-amber-600 hover:text-white py-2 transition-colors duration-300`}
              >
                {loading ? "... در حال ورود " : "ورود"}
              </button>
              <div className="flex justify-around items-center mt-3">
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                  <input type="checkbox" name="" id="" className="mr-2" />
                  <label
                    htmlFor="Remember Me"
                    className="text-white text-sm sm:text-md text-center"
                  >
                    مرا به خاطر بس‍‍‍‍‍پار
                  </label>
                </div>
                <Link
                  to="/reset"
                  className="text-white text-center rounded-md p-2 hover:bg-amber-600 duration-300"
                >
                  فراموشی رمز عبور
                </Link>
              </div>
              <br />
              <div className="text-center mt-3 ">
                <span className="sm:m-8">
                  <Link
                    to="/register"
                    className="text-white border-2 rounded-md py-2 px-8 hover:bg-amber-600"
                  >
                    ثبت نام کنید
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

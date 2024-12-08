import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../../assets/login-vector-transformed.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { login, loginUser } from "../../services/authService";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "نام کاربری باید وارد باشد")
    .nonempty("ورود نام کاربری الزامی است"),
  password: z.string().min(1, "رمز عبور باید وارد شود"),
});

const Login = () => {
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

  const login = (formData) => {
    setLoading(true);
    loginUser({ username: formData.email, password: formData.password })
      .then((response) => {
        toast.success("ورود با موفقیت انجام شد", {
          position: "top-center",
          autoClose: 500,
          style: { fontSize: "14px", padding: "10px" },
          onClose: () => {
            setLoading(false);
            navigate("/dashboard");
          },
        });
      })
      .catch((err) => {
        setLoading(false);
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
        <div className="w-3/5 bg-slate-800 border border-slate-400 rounded-md p-20 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative w-2/5">
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
              <div className="flex my-4 relative">
                <label className={`flex-[1_1_20%] text-white text-lg`}>
                  نام کاربری :
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className={`flex-[4_1_80%] py-2.3 px-2 
                    text-xl text-white font-bold
                    bg-transparent border-0 border-b-2 border-gray-300 
                    appearance-none dark:focus:border-blue-500 
                    focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer`}
                />
                {/* <BiUser className="absolute top-0 right-4" /> */}
              </div>
              {errors.email && (
                <p className="text-red-600 text-lg text-center">
                  {errors.email.message}
                </p>
              )}
              <div className="my-4 relative flex">
                <label
                  className={`text-white flex-[1_1_20%] text-lg text-left`}
                >
                  رمز عبور :
                </label>
                <input
                  type={passToggle ? "text" : "password"}
                  {...register("password")}
                  className={`flex-[4_1_55%] py-2.3 px-2 
                      text-xl text-white font-bold
                      bg-transparent border-0 border-b-2 border-gray-300 
                      appearance-none dark:focus:border-blue-500 
                      focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer`}
                  placeholder=""
                />

                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute top-3 right-4 focus:outline-none text-white"
                >
                  {passToggle ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
                <div className="flex-[4_1_15%]"></div>
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
              <div className="flex justify-around items-center mt-12">
                <div className="flex gap-2 items-center">
                  <input type="checkbox" name="" id="" className="mr-2" />
                  <label htmlFor="Remember Me" className="text-white">
                    مرا به خاطر بس‍‍‍‍‍پار
                  </label>
                </div>
                <Link
                  to="/reset"
                  className="text-white rounded-md p-2 hover:bg-amber-600 duration-300"
                >
                  فراموشی رمز عبور
                </Link>
              </div>
              <br />
              <div className="text-center mt-3">
                <span className="m-8">
                  <Link
                    to="/register"
                    className="text-white border-2 rounded-md p-3 px-8 hover:bg-amber-600"
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

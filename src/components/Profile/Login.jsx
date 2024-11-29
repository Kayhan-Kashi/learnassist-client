import React, { useState } from "react";
import image from "../../assets/login-vector-transformed.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div
      className="bg-cover bg-center h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="bg-slate-800 border border-slate-400 rounded-md p-20 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <div>
          <h1 className="text-5xl font-bold text-white mb-6 text-center">
            ورود
          </h1>
          <form
            action=""
            className="flex flex-col"
            onSubmit={() => console.log("login")}
          >
            <div className="my-4 relative">
              <input
                type="email"
                required
                className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark-text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-4 peer-focus:scale-75 peer-focus:-translate-y-6">
                نام کاربری
              </label>
              <BiUser className="absolute top-0 right-4" />
            </div>
            <div className="my-4 relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder=""
                required
                className="block w-72 py-2.3 px-0 text-lg text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="absolute text-lg text-white duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark-text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-4 peer-focus:scale-75 peer-focus:-translate-y-6">
                رمز عبور
              </label>
              {passwordVisible ? (
                <AiOutlineEye
                  className="absolute top-0 right-4 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="absolute top-0 right-4 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <input type="checkbox" name="" id="" className="mr-2" />
                <label htmlFor="Remember Me" className="text-white">
                  مرا به خاطر بس‍‍‍‍‍پار
                </label>
              </div>
              <Link to="/reset" className="text-white border-2 rounded-md p-2">
                فراموشی رمز عبور
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-amber-600 hover:text-white py-2 transition-colors duration-300"
            >
              {loading ? "Logging in..." : "ورود"}
            </button>
            {/* <button
              type="button"
              onClick={() => alert()}
              disabled={loading}
              className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-amber-600 hover:text-white py-2 transition-colors duration-300"
            >
              {loading ? "Logging in..." : "ورود میهمان"}
            </button> */}
            <br />
            <div className="text-center mt-3">
              <span className="m-8">
                <Link
                  to="/register"
                  className="text-white border-2 rounded-md p-3 px-8 border-yellow-400"
                >
                  ثبت نام کنید
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

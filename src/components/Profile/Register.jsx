import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiUser } from "react-icons/bi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import image from "../../assets/login-vector-transformed.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet";
import { validateUsername } from "../../services/authService";

const registrationSchema = z
  .object({
    username: z
      .string()
      .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
      .nonempty("ورود نام کاربری الزامی است"),
    // email: z
    //   .string()
    //   .email("ایمیل باید مجاز باشد")
    //   .nonempty("ورود ایمیل الزامی است"),
    password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار رمز عبور باید یکسان باشند",
    path: ["confirmPassword"],
  });

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registrationSchema) });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [passToggle, setPassToggle] = useState(false);
  const [cnfrmPassToggle, setCnfrmPassToggle] = useState(false);

  const navigate = useNavigate();

  const submitUser = (formData) => {
    setLoading(true);
    validateUsername({ username: formData.username, password: formData.password })
      .then((response) => {
        toast.success("نام کاربری و رمز عبور قابل قبول است", {
          position: "top-center",
          autoClose: 500,
          style: { fontSize: "14px", padding: "10px" },
          onClose: () => {
            navigate("/userInfo",
               { state: { username: formData.username, password: formData.password}});
            setLoading(true);
          },
        });
      })
      .catch((err) => {
        toast.error("ثبت نام انجام نشد", {
          position: "top-center",
          autoClose: 3000,
          style: { fontSize: "14px", padding: "10px" },
        });
      });
  };

  const togglePassword = () => {
    setPassToggle(!passToggle);
  };

  const cnfrmTogglePassword = () => {
    setCnfrmPassToggle(!cnfrmPassToggle);
  };

  return (
    <>
      <Helmet>
        <title>ثبت نام - LearnAssist</title>
        <meta
          name="description"
          content="Create an account for learnAssist web application"
        />
      </Helmet>
      <div>
        <div
          className="bg-cover bg-center h-screen flex justify-center items-center"
          style={{ backgroundImage: `url(${image})` }}
        >
          <ToastContainer />
          <div className="w-1/2 bg-slate-800 border border-slate-400 rounded-md p-20 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-50 relative">
            <div>
              <h1 className="text-4xl font-bold text-white mb-6 text-center">
                ثبت نام
              </h1>
              <form
                action=""
                className="flex flex-col"
                onSubmit={handleSubmit(submitUser)}
              >
                <div className="my-4 relative flex">
                  <label className={`flex-[1_1_20%] text-white text-lg`}>
                    نام کاربری :
                  </label>
                  <input
                    {...register("username")}
                    type="text"
                    className={`flex-[4_1_80%] py-2.3 px-2 
                      text-xl text-white font-bold
                      bg-transparent border-0 border-b-2 border-gray-300 
                      appearance-none dark:focus:border-blue-500
                      focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer `}
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-lg text-center">
                    {errors.username.message}
                  </p>
                )}
                {/* <div className="my-4 relative flex">
                  <label
                    className={`text-white flex-[1_1_20%] text-lg text-left`}
                  >
                    ایمیل :
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className={`flex-[4_1_80%] py-2.3 px-2 
                      text-xl text-white font-bold
                      bg-transparent border-0 border-b-2 border-gray-300 
                      appearance-none dark:focus:border-blue-500 
                      focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-lg text-center">
                    {errors.email.message}
                  </p>
                )} */}
                <div className="my-4 relative flex">
                  <label
                    className={`text-white flex-[1_1_30%] text-lg text-left`}
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
                <div className="flex my-4 relative">
                  <label
                    className={`flex-[1_1_30%] text-white text-lg text-left`}
                  >
                    تکرار رمز عبور :
                  </label>
                  <input
                    type={cnfrmPassToggle ? "text" : "password"}
                    {...register("confirmPassword")}
                    className={`flex-[4_1_55%] py-2.3 px-2 
                      text-xl text-white font-bold 
                      bg-transparent border-b-2 border-gray-300 
                      appearance-none dark:focus:border-blue-500 
                      focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer`}
                    placeholder=""
                  />
                  <button
                    type="button"
                    onClick={cnfrmTogglePassword}
                    className="absolute top-3 right-4 focus:outline-none text-white"
                  >
                    {cnfrmPassToggle ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                  <div className="flex-[4_1_15%]"></div>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-600 text-lg text-center">
                    {errors.confirmPassword.message}
                  </p>
                )}
                <div className="flex justify-around items-center text-center text-xl">
                  <span className="m-4">
                    قبلا عضو شده اید ؟
                    <Link
                      to="/login"
                      className="text-blue-600 mr-2 hover:text-amber-600"
                    >
                      ورود
                    </Link>
                  </span>
                </div>
                <button
                  type="submit"
                  className={`block mx-auto mb-4 text-[18px] mt-6 rounded-full text-center w-4/5
                     bg-white text-emerald-800
                      hover:bg-amber-600 hover:text-white py-2 transition-colors duration-300`}
                >
                {loading ? "... در حال بررسی " : "ثبت نام"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
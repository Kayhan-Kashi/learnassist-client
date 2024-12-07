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
import { registerUser } from "../../services/authService";

const registrationSchema = z.object({
  firstName: z.string().min(1, "ورود نام  الزامی است"),
  lastName: z.string().min(1, "ورود نام خانوادگی  الزامی است"),
  nationalCode: z.string().min(10, "کد ملی باید حتما ۱۰ رقم باشد"),
  grade: z.string().refine((value) => value !== "-1", "پایه تحصیلی الزامی است"),
  schoolName: z.string().min(3, "نام مدرسه باید حداقل ۳ کاراکتر باشد"),
});

const UserInfoForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registrationSchema) });

  const [passToggle, setPassToggle] = useState(false);
  const [cnfrmPassToggle, setCnfrmPassToggle] = useState(false);

  const navigate = useNavigate();

  const finalizeRegistration = (formData) => {
    registerUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      nationalCode: formData.nationalCode,
      grade: formData.grade,
      schoolName: formData.schoolName,
    })
      .then((response) => {
        toast.success("ثبت نام با موفقیت انجام شد", {
          position: "top-center",
          autoClose: 500,
          style: { fontSize: "14px", padding: "10px" },
          onClose: () => {
            navigate("/login");
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
        <title>ورود اطلاعات - LearnAssist</title>
        <meta
          name="description"
          content="Enter UserInfo for learnAssist web application"
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
                ورود اطلاعات
              </h1>
              <form
                action=""
                className="flex flex-col"
                onSubmit={handleSubmit(finalizeRegistration)}
              >
                <div className="flex ">
                  <div className="flex w-1/2 my-4 relative">
                    <input
                      {...register("lastName")}
                      type="text"
                      className={`flex-[4_1_80%] py-2.3 px-4
                      text-xl text-white font-bold text-center
                      bg-transparent border-0 border-b-2 border-gray-300 
                      appearance-none dark:focus:border-blue-500
                      focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer `}
                    />
                    <label className={`flex-[1_1_40%] text-white text-lg`}>
                      : نام خانوادگی
                    </label>
                  </div>
                  <div className="flex w-1/2 my-4 relative">
                    <input
                      {...register("firstName")}
                      type="text"
                      className={`flex-[4_1_60%] py-2.3 px-2 
                      text-xl text-white font-bold text-center
                      bg-transparent border-0 border-b-2 border-gray-300 
                      appearance-none dark:focus:border-blue-500
                      focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer `}
                    />
                    <label className={`flex-[1_1_10%] text-white text-lg`}>
                      : نام
                    </label>
                  </div>
                </div>
                <div className="flex">
                  {errors.lastName && (
                    <p className="text-red-500 text-lg text-center w-1/2">
                      {errors.lastName.message}
                    </p>
                  )}
                  {errors.firstName && (
                    <p className="text-red-500 text-lg text-center w-1/2">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="flex ">
                  <div className="flex w-1/2 my-4 relative text-center">
                    <select
                      className={`rounded-full flex-[1_1_40%] text-center border-2 border-black`}
                      {...register("grade")}
                    >
                      <option className="rounded-full" value={-1}>
                        انتخاب کنید
                      </option>
                      <option className="rounded-full" value={1}>
                        اول تا پنجم
                      </option>
                      <option value={2}> ششم تا دهم</option>
                      <option value={3}> یازدهم تا دوازدهم </option>
                    </select>
                    <label className={`flex-[1_1_10%] text-white text-lg`}>
                      :پایه تحصیلی
                    </label>
                  </div>
                  <div className="flex w-1/2 my-4 relative">
                    <input
                      {...register("nationalCode")}
                      type="text"
                      className={`flex-[4_1_80%] py-2.3 px-2 
                      text-xl text-white font-bold text-center
                      bg-transparent border-0 border-b-2 border-gray-300 
                      appearance-none dark:focus:border-blue-500
                      focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer `}
                    />
                    <label className={`flex-[1_1_30%] text-white text-lg`}>
                      :شماره ملی
                    </label>
                  </div>
                </div>
                <div className="flex">
                  {errors.grade && (
                    <p className="text-red-500 text-lg text-center w-1/2">
                      {errors.grade.message}
                    </p>
                  )}
                  {errors.nationalCode && (
                    <p className="text-red-500 text-lg text-center w-1/2">
                      {errors.nationalCode.message}
                    </p>
                  )}
                </div>

                <div className="flex">
                  <div className="flex w-2/3 my-4 relative mx-auto">
                    <input
                      {...register("schoolName")}
                      type="text"
                      className={`flex-[4_1_80%] py-2.3 px-2 
                      text-xl text-white font-bold text-center
                      bg-transparent border-0 border-b-2 border-gray-300 
                      appearance-none dark:focus:border-blue-500
                      focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer `}
                    />
                    <label className={`flex-[1_1_30%] text-white text-lg`}>
                      : نام مدرسه
                    </label>
                  </div>
                </div>
                {errors.schoolName && (
                  <p className="text-red-500 text-lg text-center">
                    {errors.schoolName.message}
                  </p>
                )}

                <button
                  type="submit"
                  className={`block mx-auto mb-4 text-[18px] mt-6 rounded-full text-center w-4/5
                     bg-white text-emerald-800
                      hover:bg-amber-600 hover:text-white py-2 transition-colors duration-300`}
                >
                  تکمیل ثبت نام
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfoForm;

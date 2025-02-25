import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiUser } from "react-icons/bi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import image from "../../../assets/login-vector-transformed.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet";
import { registerUser } from "../../../services/authService";
import { useLocation } from "react-router-dom";

const registrationSchema = z.object({
  firstName: z.string().min(1, "ورود نام  الزامی است"),
  lastName: z.string().min(1, "ورود نام خانوادگی  الزامی است"),
  nationalCode: z.string().min(10, "کد ملی باید حتما ۱۰ رقم باشد"),
  grade: z.string().refine((value) => value !== "-1", "پایه تحصیلی الزامی است"),
  schoolName: z.string().min(3, "نام مدرسه باید حداقل ۳ کاراکتر باشد"),
  interests: z.string().min(3),
  description: z.string().min(3),
});

const UserInfoForm = () => {
  const location = useLocation();
  const { username, password } = location.state || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registrationSchema) });

  const [loading, setLoading] = useState(false);
  const [passToggle, setPassToggle] = useState(false);
  const [cnfrmPassToggle, setCnfrmPassToggle] = useState(false);

  const navigate = useNavigate();

  const finalizeRegistration = (formData) => {
    setLoading(true);
    registerUser({
      email: "123@13.com",
      firstName: formData.firstName,
      lastName: formData.lastName,
      nationalCode: formData.nationalCode,
      grade: formData.grade,
      schoolName: formData.schoolName,
      interests: formData.interests,
      userDescription: formData.description,
      username: username,
      password: password,
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
        setLoading(false);
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
          className="bg-cover bg-center h-full flex justify-center justify-items-start"
          style={{ backgroundImage: `url(${image})` }}
        >
          <ToastContainer />
          <div
            className={`m-3  w-3/5 custom-height-userinfo bg-slate-800 border
             border-slate-400 rounded-md md:p-20 
             sm:shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative `}
          >
            <div>
              {/* <h1 className="text-4xl font-bold text-white mb-6 text-center">
                ورود اطلاعات
              </h1> */}
              <form
                action=""
                className="flex flex-col"
                onSubmit={handleSubmit(finalizeRegistration)}
              >
                <div className="flex flex-col lg:flex-row-reverse justify-items-center">
                  <div className="flex flex-col lg:flex-row-reverse my-4 relative ">
                    <label
                      className={`flex-[1_1_20%] text-white sm:text-sm md:text-lg text-center lg:text-right pr-5 whitespace-nowrap flex-shrink-0`}
                    >
                      <span className={"hidden lg:inline"}>:</span> نام
                    </label>
                    <div className={`flex flex-row`}>
                      <input
                        {...register("firstName")}
                        type="text"
                        className={`flex-[1_1_50%] py-2.3 px-2 
                        text-sm sm:text-xl text-white font-bold text-center
                        bg-transparent !border-0 !border-b-2 !border-gray-300 
                        appearance-none dark:focus:!border-blue-500 
                        focus:outline-none focus:!ring-0 focus:text-white focus:!border-blue-600 peer lg:ml-10`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row-reverse my-4 relative lg:pr-8">
                    <label
                      className={`flex-[1_1_35%] text-white sm:text-sm md:text-lg text-center lg:text-right pr-5 whitespace-nowrap flex-shrink-0`}
                    >
                      <span className={"hidden lg:inline"}>:</span> نام خانوادگی
                    </label>
                    <input
                      {...register("lastName")}
                      type="text"
                      className={`flex-[1_1_50%] py-2.3 px-2 
                        text-sm sm:text-xl text-white font-bold text-center
                        bg-transparent !border-0 !border-b-2 !border-gray-300 
                        appearance-none dark:!focus:border-blue-500 
                        focus:outline-none focus:!ring-0 focus:text-white focus:!border-blue-600 peer `}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row-reverse justify-items-center">
                  <div className="flex flex-col lg:flex-row-reverse my-4 relative">
                    <label
                      className={`flex-[1_1_20%] text-white sm:text-sm md:text-lg text-center lg:text-right pr-5 whitespace-nowrap flex-shrink-0`}
                    >
                      <span className={"hidden lg:inline"}>:</span> کد ملی
                    </label>
                    <input
                      {...register("nationalCode")}
                      type="text"
                      className={`flex-[1_1_50%] py-2.3 px-2 
                        text-sm sm:text-xl text-white font-bold text-center
                        bg-transparent !border-0 !border-b-2 !border-gray-300 
                        appearance-none dark:!focus:border-blue-500 
                        focus:outline-none focus:!!ring-0 focus:!text-white focus:!border-blue-600 peer lg:ml-10`}
                    />
                  </div>
                  <div className="flex flex-col lg:flex-row-reverse my-4 relative ">
                    <label
                      className={`flex-[1_1_3۰%] text-white ml-2 sm:text-sm md:text-lg text-center lg:text-right pr-5 whitespace-nowrap flex-shrink-0`}
                    >
                      <span className={"hidden lg:inline"}>:</span> پایه تحصیلی
                    </label>
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
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row-reverse justify-items-center">
                  <div className="flex flex-col lg:flex-row-reverse my-4 relative">
                    <label
                      className={`flex-[1_1_20%] text-white sm:text-sm md:text-lg text-center lg:text-right pr-5 whitespace-nowrap flex-shrink-0`}
                    >
                      <span className={"hidden lg:inline"}>:</span> نام مدرسه
                    </label>
                    <input
                      {...register("schoolName")}
                      type="text"
                      className={`flex-[1_1_50%] py-2.3 px-2 
                        text-sm sm:text-xl text-white font-bold text-center
                        bg-transparent !border-0 !border-b-2 !border-gray-300 
                        appearance-none dark:focus:!border-blue-500 
                        focus:outline-none focus:!ring-0 focus:!text-white focus:!border-blue-600 peer lg:ml-10`}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row-reverse justify-items-center">
                  <div className="flex flex-col lg:flex-row-reverse my-4 relative">
                    <label
                      className={`flex-[1_1_20%] text-white sm:text-sm md:text-lg text-center lg:text-right pr-5 whitespace-nowrap flex-shrink-0`}
                    >
                      <span className={"hidden lg:inline"}>:</span> علاقه ها
                    </label>
                    <textarea
                      {...register("interests")}
                      className={`flex-[1_1_80%] py-2.3 px-2 w-[220px] lg:!w-[600px] !h-32
                        text-sm sm:text-xl text-white font-bold text-right
                        bg-transparent !border-2 !border-blue-300 
                        appearance-none dark:focus:!border-blue-500 
                        focus:outline-none focus:!ring-0 focus:!text-white
                         focus:!border-blue-600 peer lg:ml-10`}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row-reverse justify-items-center">
                  <div className="flex flex-col lg:flex-row-reverse my-4 relative">
                    <label
                      className={`flex-[1_1_20%] text-white sm:text-sm md:text-lg text-center lg:text-right pr-5 whitespace-nowrap flex-shrink-0`}
                    >
                      <span className={"hidden lg:inline"}>:</span> شرح حال
                    </label>
                    <textarea
                      {...register("description")}
                      className={`flex-[1_1_80%] py-2.3 px-2 w-[220px] lg:!w-[600px] !h-32
                        text-sm sm:text-xl text-white font-bold text-right
                        bg-transparent !border-2 !border-blue-300 
                        appearance-none dark:focus:!border-blue-500 
                        focus:outline-none focus:!ring-0 focus:!text-white
                         focus:!border-blue-600 peer lg:ml-10`}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className={`block mx-auto mb-4 text-[16px] mt-6 rounded-full text-center w-3/5
                     bg-white !text-emerald-800
                      hover:!bg-amber-600 hover:!text-white py-2 transition-colors duration-300`}
                >
                  {loading ? "... در حال بررسی " : "تکمیل ثبت نام"}
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

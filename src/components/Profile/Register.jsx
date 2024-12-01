import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import image from "../../assets/login-vector-transformed.jpeg";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfrmPass, setCnfrmPass] = useState("");
  const [isSpecialMember, setIsSpecialMember] = useState(false);
  const [passToggle, setPassToggle] = useState(false);
  const [cnfrmPassToggle, setCnfrmPassToggle] = useState(false);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cnfrmPass) {
      //toast.error("Password not matched");
      return;
    }
  };

  const togglePassword = () => {
    setPassToggle(!passToggle);
  };

  const cnfrmTogglePassword = () => {
    setCnfrmPassToggle(!cnfrmPassToggle);
  };

  return (
    <>
      {/* <Helmet>
        <title>Sign Up - ChocoKart</title>
        <meta
          name="description"
          content="Create an account on ChocoKart to enjoy a personalized shopping experience for toffees and chocolates."
        />
      </Helmet> */}
      <div>
        {/* <ToastContainer /> */}
        <div
          className="bg-cover bg-center h-screen flex justify-center items-center"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="bg-slate-800 border border-slate-400 rounded-md p-20 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
            <div>
              <h1 className="text-4xl font-bold text-white mb-6 text-center">
                ثبت نام
              </h1>
              <form action="" className="flex flex-col" onSubmit={registerUser}>
                <div className="my-4 relative">
                  <input
                    type="text"
                    className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                    placeholder=""
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark-text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-4 peer-focus:scale-75 peer-focus:-translate-y-6">
                    نام کاربری
                  </label>
                  <BiUser className="absolute top-0 right-4" />
                </div>
                <div className="my-4 relative">
                  <input
                    type="email"
                    className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                    placeholder=""
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="absolute text-lg text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark-text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-4 peer-focus:scale-75 peer-focus:-translate-y-6">
                    ایمیل
                  </label>
                  <BiUser className="absolute top-0 right-4" />
                </div>
                <div className="my-4 relative">
                  <input
                    type={passToggle ? "text" : "password"}
                    className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                    placeholder=""
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="absolute text-lg text-white duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark-text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-4 peer-focus:scale-75 peer-focus:-translate-y-6">
                    رمز عبور
                  </label>
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute top-0 right-4 focus:outline-none"
                  >
                    {passToggle ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                <div className="my-4 relative">
                  <input
                    type={cnfrmPassToggle ? "text" : "password"}
                    className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                    placeholder=""
                    required
                    value={cnfrmPass}
                    onChange={(e) => setCnfrmPass(e.target.value)}
                  />
                  <label className="absolute text-lg text-white duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark-text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-4 peer-focus:scale-75 peer-focus:-translate-y-6">
                    تکرار رمز عبور
                  </label>
                  <button
                    type="button"
                    onClick={cnfrmTogglePassword}
                    className="absolute top-0 right-4 focus:outline-none"
                  >
                    {cnfrmPassToggle ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                <div className="flex justify-around items-center text-center text-xl">
                  <span className="m-4">
                    قبلا عضو شده اید ؟
                    <Link to="/login" className="text-blue-600 mr-2">
                      ورود
                    </Link>
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-amber-600 hover:text-white py-2 transition-colors duration-300"
                >
                  ثبت نام
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

import React from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getUserInfo,
  logoutFromStorage,
} from "../../../../../../services/authService";
import NavAnimatedButton from "../NavAnimatedButton/NavAnimatedButton";

const NavAccountButton = ({
  onDropHandler,
  drop,
  children,
  handleLogin,
  handleLogout,
}) => {
  const navigate = useNavigate();

  const auth = { currentUser: null };
  return (
    <>
      <button
        className="text-amber-600 font-semibold rounded inline-flex items-center"
        onMouseEnter={() => onDropHandler(!drop)}
      >
        {children}
      </button>
      <div
        className={`absolute z-50 mt-2 right-0 top-10 w-44 bg-yellow-100 rounded-2xl shadow-lg transition-all duration-400 ease-in-out transform ${
          drop
            ? "opacity-100 scale-110"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {getUserInfo() != null ? (
          <NavAnimatedButton
            text={"خروج"}
            onClickHandler={() => {
              logoutFromStorage();
            }}
            onMouseLeaveHandler={() => onDropHandler(!drop)}
            drop={drop}
          >
            <FaSignOutAlt />
          </NavAnimatedButton>
        ) : (
          <NavAnimatedButton
            text={"ورود/ثبت نام"}
            onClickHandler={() => navigate("/login")}
            onMouseLeaveHandler={() => onDropHandler(!drop)}
            drop={drop}
          >
            <FaSignInAlt />
          </NavAnimatedButton>
        )}
      </div>
    </>
  );
};

export default NavAccountButton;

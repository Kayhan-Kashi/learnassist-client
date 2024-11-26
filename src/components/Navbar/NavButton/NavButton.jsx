import React from "react";
import { FaSignInAlt } from "react-icons/fa";

const NavUserButton = ({
  onDropHandler,
  drop,
  children,
  handleLogin,
  handleLogout,
}) => {
  const auth = { currentUser: "user" };
  return (
    <>
      <button
        className="text-amber-600 font-semibold rounded inline-flex items-center"
        onClick={() => onDropHandler(!drop)}
      >
        {children}
      </button>
      {drop && (
        <div className="absolute z-50 mt-2 right-0 top-10 w-36 bg-yellow-100 rounded-2xl shadow-lg ">
          {auth.currentUser ? (
            <div>
              <button
                className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 w-full text-right hover:rounded-2xl"
                onClick={handleLogout}
              >
                ورود
                <FaSignInAlt />
              </button>
              {/* <button
                className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 w-full text-right"
                onClick={handleLogin}
              >
                ورود
              </button> */}
            </div>
          ) : (
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
              onClick={handleLogin}
            >
              ورود
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default NavUserButton;

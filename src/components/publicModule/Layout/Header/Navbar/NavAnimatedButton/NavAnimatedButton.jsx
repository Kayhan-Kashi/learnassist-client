import React from "react";

const NavAnimatedButton = ({
  children,
  text,
  onClickHandler,
  onMouseLeaveHandler,
  drop,
}) => {
  return (
    <div className="">
      <button
        className="relative top-0 left-0 z-50 px-4 py-2 text-md text-gray-700 bg-transparent hover:bg-gray-100 w-full text-right rounded-2xl flex items-center justify-between space-x-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
        onClick={() => onClickHandler(!drop)}
        onMouseLeave={() => onMouseLeaveHandler(!drop)}
      >
        {children}
        <span className="mr-2">{text}</span>
      </button>
    </div>
  );
};

export default NavAnimatedButton;

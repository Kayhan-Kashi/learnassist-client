import React from "react";
import { GiChocolateBar } from "react-icons/gi";

const NavMenuButton = ({ onClickHandler, status, children }) => {
  return (
    <div
      className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
      onClick={() => onClickHandler(!status)}
    >
      {children}
    </div>
  );
};

export default NavMenuButton;

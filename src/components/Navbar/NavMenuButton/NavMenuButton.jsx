import React from "react";
import { GiChocolateBar } from "react-icons/gi";

const NavMenuButton = ({ onClickHandler, status, children }) => {
  return (
    <div
      className="block md:hidden text-3xl absolute right-8 top-2 cursor-pointer"
      onClick={() => onClickHandler(!status)}
    >
      {children}
    </div>
  );
};

export default NavMenuButton;

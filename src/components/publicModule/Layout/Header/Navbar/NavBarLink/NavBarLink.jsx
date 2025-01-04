import React from "react";
import { NavLink } from "react-router-dom";

const NavBarLink = ({ link }) => {
  return (
    <div
      className={
        `md:ml-8 sm:text-sm md:text-lg lg:text-2xl md:my-0 text-center whitespace-nowrap
        my-7 mx-8 sm:border-x-2 sm:border-yellow-600 sm:px-4 `
      } 
    >
      <NavLink
        to={link.link}
        className={({ isActive }) =>
          `hover:text-gray-400 duration-500 ${
            isActive ? "text-black" : "text-amber-600"
          }`
        }
      >
        {link.name}
      </NavLink>
    </div>
  );
};

export default NavBarLink;

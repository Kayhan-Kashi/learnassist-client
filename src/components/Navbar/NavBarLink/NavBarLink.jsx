import React from "react";
import { NavLink } from "react-router-dom";

const NavBarLink = ({ link }) => {
  return (
    <div
      className={
        "md:ml-8 text-2xl md:my-0 my-7 mx-8 border-x-2 border-yellow-600 px-4 "
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

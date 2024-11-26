import React from "react";
import ImageBoys1 from "../../assets/logo-boys1.jpg";
import ImageBoys2 from "../../assets/logo-boys2.jpg";
import { GiChocolateBar } from "react-icons/gi";

import { FaRegUser, FaSignInAlt } from "react-icons/fa";

import { useState } from "react";
import NavImageIcon from "./NavImageIcon/NavImageIcon";
import NavBarLink from "./NavBarLink/NavBarLink";
import NavMenuButton from "./NavMenuButton/NavMenuButton";
import NavButton from "./NavButton/NavButton";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const links = [
    { name: "خانه", link: "/" },
    { name: "دوره های آموزشی", link: "/courses" },
    { name: "تماس با ما", link: "/contact-us" },
  ];

  return (
    <div className="sticky z-50 shadow-md w-full top-0 left-0">
      <nav className="md:flex items-center justify-between bg-white md:px-10 px-7">
        <NavImageIcon image={ImageBoys1} />
        <NavMenuButton onClickHandler={setOpen} status={open}>
          <GiChocolateBar />
        </NavMenuButton>
        <ul
          className={`md:flex md:items-center absolute md:static text-amber-600 bg-white z-50 left-0 w-full md:w-auto transition-all duration-200 ease-in-out ${
            open ? "top-20" : "top-[-490px]"
          }`}
        >
          {links.map((link, idx) => {
            return (
              <li key={idx}>
                <NavBarLink link={link} idx={idx} />
              </li>
            );
          })}
          <li className="md:ml-8 text-xl md:my-0 my-7 mx-8 relative">
            <NavButton onDropHandler={setDrop} drop={drop}>
              <FaRegUser />
            </NavButton>
          </li>
        </ul>
        <NavImageIcon image={ImageBoys2} />
      </nav>
    </div>
  );
};

export default Navbar;

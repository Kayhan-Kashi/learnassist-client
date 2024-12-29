import React from "react";
import ImageBoys1 from "../../assets/logo-boys1.jpg";
import ImageBoys2 from "../../assets/logo-boys2.jpg";
import { GiChocolateBar } from "react-icons/gi";

import { FaRegUser } from "react-icons/fa";

import { useState } from "react";
import NavImageIcon from "./NavImageIcon/NavImageIcon";
import NavBarLink from "./NavBarLink/NavBarLink";
import NavMenuButton from "./NavMenuButton/NavMenuButton";
import NavAccountButton from "./NavAccountButton/NavAccountButton";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const links = [
    { name: "خانه", link: "/" },
    { name: "دوره های آموزشی", link: "/courses" },
    { name: "تماس با ما", link: "/contact-us" },
  ];

  return (
    <div className="sticky items-center z-50 shadow-md w-full top-0 left-0 \">
      <nav className={`flex items-center 
        justify-between bg-white px-7 border-4 border-red-600 `}>
        <NavImageIcon image={ImageBoys1} className={`hidden sm:block sm:w-[5rem] lg:w-[9rem]`}/>
        {/* <NavMenuButton onClickHandler={setOpen} status={open}>
          <GiChocolateBar />
        </NavMenuButton> */}
        <ul
          className={`flex items-center 
            static text-amber-600 bg-white z-50 
            left-0 w-auto transition-all duration-200 ease-in-out ${
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
            <NavAccountButton onDropHandler={setDrop} drop={drop}>
              <FaRegUser />
            </NavAccountButton>
          </li>
        </ul>
        <NavImageIcon image={ImageBoys2} className={`hidden md:block sm:w-[5rem] lg:w-[9rem]`}/>
      </nav>
    </div>
  );
};

export default Navbar;

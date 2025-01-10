import React from "react";
import ImageBoys1 from "../../../../../assets/logo-boys1.jpg";
import ImageBoys2 from "../../../../../assets/logo-boys2.jpg";

import { FaRegUser } from "react-icons/fa";

import { useState } from "react";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../../../../services/authService";
import NavAccountButton from "./NavAccountButton/NavAccountButton";
import NavBarLink from "./NavBarLink/NavBarLink";
import NavImageIcon from "./NavImageIcon/NavImageIcon";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const links = [
    { name: "خانه", link: "/" },
    { name: "دوره های آموزشی", link: "/courses" },
    // { name: "تماس با ما", link: "/contact-us" },
  ];

  const userInfo = getUserInfo();
  const isLogged = useSelector((state) => state.login.isLoggedIn);
  //alert(isLogged);

  // useEffect(() => {
  //   alert(userInfo);
  // },[userInfo]);

  return (
    <div className="sticky items-center z-50 shadow-md w-full top-0 left-0 \">
      <nav
        className={`flex items-center 
        justify-between bg-white px-7 border-2 border-yellow-600 `}
      >
        <NavImageIcon
          image={ImageBoys1}
          className={`hidden sm:block sm:w-[5rem] lg:w-[9rem]`}
        />
        <ul
          className={`flex items-center 
            static text-amber-600 bg-white z-50 
            left-0 w-auto transition-all duration-200 ease-in-out ${
              open ? "top-20" : "top-[-490px]"
            }`}
          style={{ marginBottom: "0px" }}
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
          {userInfo?.isLoggedIn && (
            <li>
              <p className="text-red-500 mb-2">
                سلام {userInfo.firstname} خوش آمدی
              </p>
            </li>
          )}
        </ul>
        <NavImageIcon
          image={ImageBoys2}
          className={`hidden md:block sm:w-[5rem] lg:w-[9rem]`}
        />
      </nav>
    </div>
  );
};

export default Navbar;

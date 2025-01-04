import React from "react";
import Navbar from "./Navbar/Navbar.jsx";
import Carousel from "../Header/Carousel/Carousel.jsx";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation(); // Get the current location
  const isLandingPage = location.pathname === "/";

  return (
    <header>
      <Navbar />
      {isLandingPage && <Carousel />}
    </header>
  );
};

export default Header;

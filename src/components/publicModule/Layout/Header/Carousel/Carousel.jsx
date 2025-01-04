import React from "react";
import { Link } from "react-router-dom";
import image from "../../../../../assets/login-vector-transformed.jpeg";
import ImageCarousel from "../../../../../assets/e-learning-carousel1.jpg";
import { useState } from "react";

const Carousel = () => {
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);

  return (
    <div className="w-full relative overflow-hidden z-40">
      {/* <Link to="/product"> */}
      <img
        src={image}
        alt={`Brand ${currentBrandIndex + 1}`}
        className="z-40 w-full h-full bg-cover bg-center sm:h-screen object-cover md:object-cover md:w-[100%]"
      />
      {/* </Link> */}
    </div>
  );
};

export default Carousel;

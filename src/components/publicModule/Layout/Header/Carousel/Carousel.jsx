import React from "react";
import { Link } from "react-router-dom";
import image from "../../../../../assets/login-vector-transformed.jpeg";
import ImageCarousel from "../../../../../assets/e-learning-carousel1.jpg";
import { useState } from "react";

const Carousel = () => {
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);

  return (
    <>
      <div
        className="bg-cover bg-center h-screen flex justify-center justify-items-start"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
    </>
  );
};

export default Carousel;

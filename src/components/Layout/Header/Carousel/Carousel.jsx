import React from "react";
import { Link } from "react-router-dom";
import ImageCarousel from "../../../../assets/e-learning-carousel1.jpg";
import { useState } from "react";

const Carousel = () => {
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);

  return (
    <div className="w-full relative">
      {/* <Link to="/product"> */}
      <img
        src={ImageCarousel}
        alt={`Brand ${currentBrandIndex + 1}`}
        className="w-full h-full object-contain md:object-cover md:w-[100%]"
      />
      {/* </Link> */}
    </div>
  );
};

export default Carousel;

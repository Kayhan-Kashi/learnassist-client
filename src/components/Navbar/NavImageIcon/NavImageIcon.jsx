import React from "react";

const NavImageIcon = ({ image, className }) => {
  return (
    <div>
      <img src={image} alt="children Logo" className={className} />
    </div>
  );
};

export default NavImageIcon;

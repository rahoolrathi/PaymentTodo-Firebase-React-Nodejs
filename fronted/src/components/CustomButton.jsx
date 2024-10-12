import React from "react";

const CustomButton = ({ onClick, children, isActive }) => {
  return (
    <button onClick={onClick} className={isActive ? "active" : ""}>
      {children}
    </button>
  );
};

export default CustomButton;

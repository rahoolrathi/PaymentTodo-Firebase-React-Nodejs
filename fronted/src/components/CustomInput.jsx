import React from "react";

const CustomInput = ({ type, placeholder, value, onChange, name }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name} // name is important for identifying which field is being updated
    />
  );
};

export default CustomInput;

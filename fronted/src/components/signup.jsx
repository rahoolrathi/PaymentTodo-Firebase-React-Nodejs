import React from "react";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

const Signup = () => {
  return (
    <div className="customForm">
      <h2>Signup Form</h2>
      <CustomInput type="text" placeholder="Full Name" />
      <CustomInput type="email" placeholder="Email" />
      <CustomInput type="password" placeholder="Password" />
      <CustomInput type="password" placeholder="Confirm Password" />
      <CustomButton>Signup</CustomButton>
    </div>
  );
};

export default Signup;

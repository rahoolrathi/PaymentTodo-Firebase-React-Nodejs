import React from "react";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

const Login = () => {
  return (
    <div className="customForm">
      <h2>Login Form</h2>
      <CustomInput type="email" placeholder="Email" />
      <CustomInput type="password" placeholder="Password" />
      <CustomButton>Login</CustomButton>
      <p>
        Not a Member? <a href="#">Signup now</a>
      </p>
    </div>
  );
};

export default Login;

import { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import CustomButton from "./CustomButton";

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true); // Set default to login

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <CustomButton onClick={() => setIsLogin(true)} isActive={isLogin}>
            Login
          </CustomButton>
          <CustomButton onClick={() => setIsLogin(false)} isActive={!isLogin}>
            SignUp
          </CustomButton>
        </div>
        {isLogin ? <Login /> : <Signup />}
      </div>
    </div>
  );
};

export default AuthContainer;

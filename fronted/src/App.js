// src/App.js
import React from "react";
import AuthContainer from "./components/AuthContainer";
import "./App.css"; // Add your CSS here
import Signup from "./components/signup";
import Mainpage from "./components/MainPage";
import PaymentCard from "./components/Paymentcard";
import { Navbar } from "react-bootstrap";
import Login from "./components/login";
const App = () => {
  return (
    <div>
      <Mainpage />
    </div>
  );
};

export default App;

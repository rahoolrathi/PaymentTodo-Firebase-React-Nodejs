// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import AuthContainer from "./components/AuthContainer"; // Your auth component
import Mainpage from "./components/MainPage";
// Add your CSS here
// import Signup from "./components/signup";
// import Mainpage from "./components/MainPage";
// import PaymentCard from "./components/Paymentcard";
// import { Navbar } from "react-bootstrap";
// import Login from "./components/login";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthContainer />} />
        <Route path="/main" element={<Mainpage />} />
      </Routes>
    </Router>
  );
};

export default App;

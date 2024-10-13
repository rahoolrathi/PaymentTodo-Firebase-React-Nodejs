import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "..//firebase"; // Your Firebase config
import {
  validateFullName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../validations"; // Import validation functions
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    // Validate inputs using validation functions
    const fullNameError = validateFullName(fullName);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword
    );

    // If any validation error exists, set the error message and stop the process
    if (fullNameError) return setError(fullNameError);
    if (emailError) return setError(emailError);
    if (passwordError) return setError(passwordError);
    if (confirmPasswordError) return setError(confirmPasswordError);

    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update the user's profile with the full name
      await updateProfile(user, { displayName: fullName });
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("authToken", token);
      navigate("/main");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already in use.");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="customForm">
      <h2>Signup Form</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Full Name"
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { validateEmail, validatePassword } from "../validations"; // Import validation functions
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/main", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async () => {
    // Validate inputs using validation functions
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    // If any validation error exists, set the error message and stop the process
    if (emailError) return setError(emailError);
    if (passwordError) return setError(passwordError);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("authToken", token);
      navigate("/main");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="customForm">
      <h2>Login Form</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, messaging, generateToken } from "../firebase"; // Your Firebase config
import { getToken } from "firebase/messaging";
import axios from "axios";
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
  const [fcmToken, setFcmToken] = useState("");
  const navigate = useNavigate();
  const vapidKey =
    "BDt-BJD1KRCT9djFmI2NC7GulE9VBY-6KLyPQ_GlX_mor-L6idVj0niMhCsyfv-t-qSGwI1EWDYWdLrjMu_hAcM";
  useEffect(() => {
    const fetchFcmToken = async () => {
      try {
        const token = await getToken(messaging, { vapidKey: vapidKey });
        console.log("-----------fcm", token);
        if (token) {
          setFcmToken(token);
        } else {
          console.error(
            "No registration token available. Request permission to generate one."
          );
        }
      } catch (error) {
        console.error("An error occurred while retrieving token. ", error);
      }
    };
    generateToken();
    fetchFcmToken();
  }, []);

  const sendFcmTokenToServer = async (fcmToken) => {
    try {
      // Get Firebase auth token from localStorage
      const authToken = localStorage.getItem("authToken");
      // Prepare the data to send to the server
      const payload = {
        fcmToken: fcmToken,
      };

      // Make the POST request to the server
      const response = await axios.post(
        "http://localhost:3001/api/user/save-fcm-token",
        payload,
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Send Firebase auth token in header
          },
          // Convert the payload to JSON
        }
      );

      if (response.status === 200) {
        console.log("FCM token successfully sent to the server.");
      } else {
        console.error(
          "Failed to send FCM token to the server. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error while sending FCM token to the server:", error);
    }
  };

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
      if (fcmToken) {
        await sendFcmTokenToServer(fcmToken);
      } else {
        console.error("FCM Token is not available.");
      }
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

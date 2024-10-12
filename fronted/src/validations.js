// validators.js

// Validate full name (at least 3 characters)
export const validateFullName = (fullName) => {
  if (fullName.trim().length < 3) {
    return "Full name must be at least 3 characters long.";
  }
  return null; // No error
};

// Validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email.";
  }
  return null; // No error
};

// Validate password length (at least 6 characters)
export const validatePassword = (password) => {
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  return null; // No error
};

// Validate if passwords match
export const validateConfirmPassword = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }
  return null; // No error
};

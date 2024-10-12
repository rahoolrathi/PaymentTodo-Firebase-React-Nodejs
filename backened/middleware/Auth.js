const { admin } = require("../firebaseAdmin.js");
const { STATUS_CODE } = require("../utils/constant.js");
const authMiddleware = () => {
  return async (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next({
        message: "Unauthorized request! Token is missing or invalid.",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      // Verify the Firebase ID token
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken; // Attach user info to the request
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      return next(new Error("Invalid Token: " + error.message));
    }
  };
};

module.exports = authMiddleware;

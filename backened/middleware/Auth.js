const { admin } = require("../firebaseAdmin.js");
const { STATUS_CODE } = require("../utils/constant.js");

const authMiddleware = () => {
  return async (req, res, next) => {
    const authHeader = req.header("Authorization");
    console.log("------", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(STATUS_CODE.UNAUTHORIZED).json({
        message: "Unauthorized request! Token is missing or invalid.",
      });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken; // Attach user info to the request
      // Call the next middleware or route handler directly
      return next();
    } catch (error) {
      return res.status(STATUS_CODE.UNAUTHORIZED).json({
        message: "Invalid Token: " + error.message,
      });
    }
  };
};

module.exports = authMiddleware;

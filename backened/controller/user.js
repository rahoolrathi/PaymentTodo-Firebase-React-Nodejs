// controllers/userTokenController.js
const { saveFcmToken } = require("../models/user");

const handleSaveFcmToken = async (req, res) => {
  const { fcmToken } = req.body;
  console.log("-------", fcmToken);
  const userId = req.user.uid;
  if (!fcmToken) {
    return res.status(400).send("FCM token are required.");
  }

  try {
    const result = await saveFcmToken(userId, fcmToken);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { handleSaveFcmToken };

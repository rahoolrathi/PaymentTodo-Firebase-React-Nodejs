const { db } = require("../firebaseAdmin");

const saveFcmToken = async (userId, fcmToken) => {
  try {
    const userTokenRef = db.collection("userTokens").doc(userId);
    await userTokenRef.set({ fcmToken });
    console.log(`Stored FCM token for user: ${userId}`);
    return { success: true };
  } catch (error) {
    console.error("Error saving FCM token:", error);
    throw new Error("Error saving FCM token");
  }
};

module.exports = { saveFcmToken };

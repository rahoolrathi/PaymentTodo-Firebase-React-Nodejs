// Import necessary modules
const NotificationModel = require("../models/notifactions");
const PaymentTodo = require("../models/paymenttodo");
const { admin, db } = require("../firebaseAdmin");

const notifyUnpaidPayments = async () => {
  try {
    // Fetch all unpaid payments
    const unpaidPayments = await PaymentTodo.getUnpaidPayments();
    console.log(unpaidPayments);

    for (let payment of unpaidPayments) {
      const { id: paymentId, title, dueDate, userId } = payment; // Assume payment has a userId field

      // Fetch FCM token for the user from Firestore
      const userDoc = await db.collection("userTokens").doc(userId).get(); // Adjust collection name if needed
      if (userDoc.exists) {
        const userData = userDoc.data();
        const fcmToken = userData.fcmToken; // Assuming the token is stored under 'fcmToken'

        if (fcmToken) {
          // Create notification document for each unpaid payment in every 24 hours
          await NotificationModel.createNotification(paymentId, title, dueDate);

          // Send notification
          const message = {
            notification: {
              title: `Payment Due: ${title}`,
              body: `Your payment is due on ${dueDate}`,
            },
            token: fcmToken,
          };

          // Send the message
          await admin.messaging().send(message);
          console.log(`Notification created and sent for payment: ${title}`);
        } else {
          console.log(`No FCM token found for user ID: ${userId}`);
        }
      } else {
        console.log(`User document not found for user ID: ${userId}`);
      }
    }
  } catch (error) {
    console.error("Error during notification creation:", error);
  }
};

//this function will fetch all notifactions based on used id
const getNotificationsByUserId = async (req, res) => {
  try {
    const userId = req.user.uid;

    const notifications = await NotificationModel.getNotificationsByUserId(
      userId
    );

    return res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Export the controller functions
module.exports = {
  getNotificationsByUserId,
  notifyUnpaidPayments,
};

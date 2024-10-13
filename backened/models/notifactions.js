// Import Firebase Firestore and Payment Model
const { db } = require("../firebaseAdmin");
const { collection, query, where, getDocs } = require("firebase/firestore");
const PaymentTodo = require("../models/paymenttodo"); // Assuming you have a separate Payment model

class NotificationModel {
  // Create a new notification in Firestore
  static async createNotification(paymentId, title, dueDate) {
    try {
      const message = `Payment due for ${title}`;
      const notificationRef = db.collection("notifications").doc(paymentId);

      await notificationRef.set({
        message,
        dueDate,
        paymentId,
        createdAt: new Date(),
      });

      return { message: "Notification created with ID:" };
    } catch (error) {
      throw new Error("Error adding notification: " + error.message);
    }
  }

  static async getNotificationsByUserId(userId) {
    try {
      const notificationSnapshot = await db.collection("notifications").get();

      let notifications = [];

      for (const notificationDoc of notificationSnapshot.docs) {
        const notificationData = notificationDoc.data();

        // Use the paymentId to check if it belongs to the user
        const paymentSnapshot = await db
          .collection("payments")
          .doc(notificationData.paymentId)
          .get();

        if (paymentSnapshot.exists) {
          const paymentData = paymentSnapshot.data();

          // Check if the payment's userId matches the given userId
          if (paymentData.userId === userId) {
            // Only include message and dueDate
            notifications.push({
              message: notificationData.message,
              dueDate: notificationData.dueDate,
            });
          }
        }
      }

      return notifications;
    } catch (error) {
      console.error("Error fetching notifications: ", error);
      return [];
    }
  }
}

module.exports = NotificationModel;

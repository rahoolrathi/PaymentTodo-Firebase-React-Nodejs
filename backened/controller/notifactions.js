// Import necessary modules
const NotificationModel = require("../models/notifactions");
const PaymentTodo = require("../models/paymenttodo");
const notifyUnpaidPayments = async () => {
  try {
    const unpaidPayments = await PaymentTodo.getUnpaidPayments();
    console.log(unpaidPayments);
    for (let payment of unpaidPayments) {
      const { id: paymentId, title, dueDate } = payment;

      await NotificationModel.createNotification(paymentId, title, dueDate);

      console.log(`Notification created for payment: ${title}`);
    }
  } catch (error) {
    console.error("Error during notification creation:", error);
  }
};
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

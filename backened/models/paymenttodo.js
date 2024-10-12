const { db } = require("../firebaseAdmin");
const { PaymentStatus } = require("../utils/constant");
class PaymentTodo {
  constructor(
    title,
    description,
    dueDate,
    userId,
    status = PaymentStatus.UNPAID
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.userId = userId;
    this.status = status;
    this.createdAt = new Date();
    this.deletedAt = null;
  }

  static async addPayment(
    title,
    description,
    dueDate,
    userId,
    status = "UNPAID"
  ) {
    const createdAt = new Date();
    try {
      const docRef = await db.collection("payments").add({
        userId: userId,
        title: title,
        description: description,
        dueDate: dueDate,
        status: status,
        createdAt: createdAt,
        deletedAt: null,
      });
      return { message: "Payment added successfully", id: docRef.id };
    } catch (error) {
      throw new Error("Error adding payment: " + error.message);
    }
  }
  // Soft delete a payment by setting deletedAt timestamp
  static async softDelete(paymentId) {
    try {
      const paymentRef = db.collection("payments").doc(paymentId);
      await paymentRef.update({
        deletedAt: new Date(), // Set the current timestamp for soft delete
      });
      return { message: "Payment soft deleted successfully" };
    } catch (error) {
      throw new Error("Error soft deleting payment: " + error.message);
    }
  }

  // Edit payment details (title, description, dueDate, status)
  static async editPayment(paymentId, updatedData) {
    try {
      const paymentRef = db.collection("payments").doc(paymentId);
      const updates = {
        ...updatedData,
        updatedAt: new Date(), // Add updated timestamp
      };

      await paymentRef.update(updates);
      return { message: "Payment updated successfully" };
    } catch (error) {
      throw new Error("Error updating payment: " + error.message);
    }
  }

  // Get all payments by user ID
  static async getAllPaymentsByUserId(userId) {
    try {
      const paymentsRef = db.collection("payments");
      const querySnapshot = await paymentsRef
        .where("userId", "==", userId)
        .where("deletedAt", "==", null) // Exclude soft-deleted payments
        .get(); // Query for user's payments
      const payments = [];

      querySnapshot.forEach((doc) => {
        payments.push({ id: doc.id, ...doc.data() }); // Push payment data to array
      });

      return payments;
    } catch (error) {
      throw new Error("Error fetching payments: " + error.message);
    }
  }

  // Get payment by ID
  static async getPaymentById(paymentId) {
    try {
      const paymentRef = db.collection("payments").doc(paymentId);
      const snapshot = await paymentRef.get();

      if (!snapshot.exists) {
        return null;
      }

      return { id: snapshot.id, ...snapshot.data() };
    } catch (error) {
      throw new Error("Error fetching payment: " + error.message);
    }
  }
}

module.exports = PaymentTodo;

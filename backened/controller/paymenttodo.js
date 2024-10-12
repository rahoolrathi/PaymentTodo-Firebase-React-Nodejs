const PaymentTodo = require("../models/paymenttodo");
const { generateResponse, parseBody } = require("../utils/helper");
const { STATUS_CODE } = require("../utils/constant.js");
const {
  createPaymentValidator,
  updatePaymentValidator,
  idValidator,
} = require("../validations/todoValidator.js");

// Add new payment
const addPaymentTodo = async (req, res) => {
  try {
    const body = parseBody(req.body);
    const { error } = createPaymentValidator.validate(body);
    console.log("-----------", error);
    if (error) {
      return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).json({
        status: false,
        statusCode: STATUS_CODE.UNPROCESSABLE_ENTITY,
        message: error.details[0].message,
      });
    }

    const { title, description, dueDate, status } = body;
    const userId = req.user.uid;
    const result = await PaymentTodo.addPayment(
      title,
      description,
      dueDate,
      userId,
      status
    );
    if (!result) {
      return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: "Something went wrong",
      });
    }

    return generateResponse(
      result,
      "Payment added successfully",
      res,
      STATUS_CODE.CREATED
    );
  } catch (error) {
    console.error("Internal Server Error:", error); // Log the error for debugging
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// Soft delete a payment
const softDeletePaymentTodo = async (req, res) => {
  try {
    const id = req.params.paymentId;
    console.log("------", req.params);

    // Validate the payment ID
    const { error } = idValidator.validate({ paymentId: id });
    if (error) {
      return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).json({
        status: false,
        statusCode: STATUS_CODE.UNPROCESSABLE_ENTITY,
        message: error.details[0].message,
      });
    }

    // Check if the payment exists
    const payment = await PaymentTodo.getPaymentById(id);
    if (!payment) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: false,
        message: "Payment not found",
      });
    }

    // Check if the payment is already deleted
    if (payment.deletedAt) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        status: false,
        message: "Payment already deleted",
      });
    }

    // Proceed to soft delete the payment
    const result = await PaymentTodo.softDelete(id);
    return generateResponse(
      result,
      "Payment deleted successfully",
      res,
      STATUS_CODE.OK
    );
  } catch (error) {
    console.error("Internal Server Error:", error); // Log the error for debugging
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// Edit payment
const editPaymentTodo = async (req, res) => {
  try {
    const body = parseBody(req.body);
    const { paymentId, ...updatedData } = body;

    if (!Object.keys(updatedData).length) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
        status: false,
        message: "Invalid data",
      });
    }

    const { error } = updatePaymentValidator.validate(updatedData);
    if (error) {
      return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).json({
        status: false,
        statusCode: STATUS_CODE.UNPROCESSABLE_ENTITY,
        message: error.details[0].message,
      });
    }

    // First, find if the payment exists by paymentId
    const payment = await PaymentTodo.getPaymentById(paymentId);
    if (!payment || payment.deletedAt) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: false,
        message: "Payment not found or already deleted",
      });
    }

    const result = await PaymentTodo.editPayment(paymentId, updatedData);
    return generateResponse(
      result,
      "Payment updated successfully",
      res,
      STATUS_CODE.OK
    );
  } catch (error) {
    console.error("Internal Server Error:", error); // Log the error for debugging
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// Get all payments by user ID
const getPaymentsTodoByUserId = async (req, res) => {
  try {
    const userId = req.user.uid;
    const payments = await PaymentTodo.getAllPaymentsByUserId(userId);

    if (!payments.length) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: false,
        message: "No payments found",
      });
    }

    return generateResponse(
      payments,
      "Payments retrieved successfully",
      res,
      STATUS_CODE.OK
    );
  } catch (error) {
    console.error("Internal Server Error:", error); // Log the error for debugging
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// Get payment by ID
const getPaymentTodoById = async (req, res) => {
  try {
    const id = req.params.paymentId;
    const { error } = idValidator.validate({ paymentId: id });
    if (error) {
      return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).json({
        status: false,
        statusCode: STATUS_CODE.UNPROCESSABLE_ENTITY,
        message: error.details[0].message,
      });
    }

    const payment = await PaymentTodo.getPaymentById(id);
    if (!payment || payment.deletedAt) {
      return res.status(STATUS_CODE.NOT_FOUND).json({
        status: false,
        message: "Payment not found or already deleted",
      });
    }

    return generateResponse(
      payment,
      "Payment retrieved successfully",
      res,
      STATUS_CODE.OK
    );
  } catch (error) {
    console.error("Internal Server Error:", error); // Log the error for debugging
    return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  addPaymentTodo,
  softDeletePaymentTodo,
  editPaymentTodo,
  getPaymentsTodoByUserId,
  getPaymentTodoById,
};

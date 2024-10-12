const PaymentTodo = require("../models/paymenttodo");
const { generateResponse, parseBody } = require("../utils/helper");
const { STATUS_CODE } = require("../utils/constant.js");
const {
  createPaymentValidator,
  updatePaymentValidator,
  idValidator,
} = require("../validations/todoValidator.js");

// Add new payment
const addPaymentTodo = async (req, res, next) => {
  try {
    const { error } = createPaymentValidator.validate(req.body);
    if (error) {
      return generateResponse(
        null,
        error.details[0].message,
        res,
        STATUS_CODE.BAD_REQUEST
      );
    }

    const { title, description, dueDate, status } = parseBody(req.body);
    const userId = req.user.id;
    const result = await PaymentTodo.addPayment(
      title,
      description,
      dueDate,
      userId,
      status
    );
    return generateResponse(
      result,
      "Payment added successfully",
      res,
      STATUS_CODE.CREATED
    );
  } catch (error) {
    next(error);
  }
};

// Soft delete a payment
const softDeletePaymentTodo = async (req, res, next) => {
  try {
    const { error } = idValidator.validate({ paymentId: req.params.paymentId });
    if (error) {
      return generateResponse(
        null,
        error.details[0].message,
        res,
        STATUS_CODE.BAD_REQUEST
      );
    }

    const { paymentId } = parseBody(req.params); // Parse the paymentId from req.params
    const result = await PaymentTodo.softDelete(paymentId);
    return generateResponse(
      result,
      "Payment soft deleted successfully",
      res,
      STATUS_CODE.OK
    );
  } catch (error) {
    next(error);
  }
};

// Edit payment
const editPaymentTodo = async (req, res, next) => {
  try {
    const { error } = updatePaymentValidator.validate(req.body);
    if (error) {
      return generateResponse(
        null,
        error.details[0].message,
        res,
        STATUS_CODE.BAD_REQUEST
      );
    }

    const { error: idError } = idValidator.validate({
      paymentId: req.params.paymentId,
    });
    if (idError) {
      return generateResponse(
        null,
        idError.details[0].message,
        res,
        STATUS_CODE.BAD_REQUEST
      );
    }

    const { paymentId } = parseBody(req.params); // Parse paymentId from req.params
    const updatedData = parseBody(req.body); // Parse body for updated data
    const result = await PaymentTodo.editPayment(paymentId, updatedData);

    return generateResponse(
      result,
      "Payment updated successfully",
      res,
      STATUS_CODE.OK
    );
  } catch (error) {
    next(error);
  }
};

// Get all payments by user ID
const getPaymentsTodoByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id; // Retrieve userId from req.user
    const payments = await PaymentTodo.getAllPaymentsByUserId(userId);

    return generateResponse(
      payments,
      "Payments retrieved successfully",
      res,
      STATUS_CODE.OK
    );
  } catch (error) {
    next(error);
  }
};

// Get payment by ID
const getPaymentTodoById = async (req, res, next) => {
  try {
    const { error } = idValidator.validate({ paymentId: req.params.paymentId });
    if (error) {
      return generateResponse(
        null,
        error.details[0].message,
        res,
        STATUS_CODE.BAD_REQUEST
      );
    }

    const { paymentId } = parseBody(req.params); // Parse the paymentId from req.params
    const payment = await PaymentTodo.getPaymentById(paymentId);

    return generateResponse(
      payment,
      "Payment retrieved successfully",
      res,
      STATUS_CODE.OK
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addPaymentTodo,
  softDeletePaymentTodo,
  editPaymentTodo,
  getPaymentsTodoByUserId,
  getPaymentTodoById,
};

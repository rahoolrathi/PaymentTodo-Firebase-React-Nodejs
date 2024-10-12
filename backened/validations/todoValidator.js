const Joi = require("joi");

const createPaymentValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.date().required(),
  userId: Joi.string().required(),
  status: Joi.string().valid("UNPAID", "PAID", "PENDING").optional(),
});

const updatePaymentValidator = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  dueDate: Joi.date().optional(),
  status: Joi.string().valid("UNPAID", "PAID", "PENDING").optional(),
});

// ID validation schema (for paymentId)
const idValidator = Joi.object({
  paymentId: Joi.string().required().label("Payment ID"), // Validate the paymentId as a required string
});

module.exports = {
  createPaymentValidator,
  updatePaymentValidator,
  idValidator,
};

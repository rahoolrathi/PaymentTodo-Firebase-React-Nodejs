const Joi = require("joi");

const createPaymentValidator = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "title is required.",
    "string.empty": "title cannot be empty.",
  }),
  description: Joi.string().required().messages({
    "any.required": "description is required.",
    "string.empty": "description cannot be empty.",
  }),
  dueDate: Joi.string()
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .required()
    .messages({
      "any.required": "date is required.",
      "string.empty": "date cannot be empty.",
      "string.pattern.base": "date must be in the format DD-MM-YYYY.",
    }),
  status: Joi.string().valid("UNPAID", "PAID").default("UNPAID"),
}).messages({
  "object.unknown": "Invalid field {#label}",
});

const updatePaymentValidator = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "title is required.",
    "string.empty": "title cannot be empty.",
  }),
  description: Joi.string().required().messages({
    "any.required": "description is required.",
    "string.empty": "description cannot be empty.",
  }),
  dueDate: Joi.string()
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .required()
    .messages({
      "any.required": "date is required.",
      "string.empty": "date cannot be empty.",
      "string.pattern.base": "date must be in the format DD-MM-YYYY.",
    }),
  status: Joi.string().valid("UNPAID", "PAID").messages({
    "any.required": "status is required.",
    "string.empty": "status cannot be empty.",
  }),
}).messages({
  "object.unknown": "Invalid field {#label}",
});

// ID validation schema (for paymentId)
const idValidator = Joi.object({
  paymentId: Joi.string().required().messages({
    "any.required": "Payment ID is required.",
    "string.empty": "Payment ID cannot be empty.",
  }), // Validate the paymentId as a required string
}).messages({
  "object.unknown": "Invalid field {#label}",
});

module.exports = {
  createPaymentValidator,
  updatePaymentValidator,
  idValidator,
};

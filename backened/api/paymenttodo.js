"use strict";

const router = require("express").Router();
const {
  addPaymentTodo,
  softDeletePaymentTodo,
  editPaymentTodo,
  getPaymentsTodoByUserId,
  getPaymentTodoById,
} = require("../controller/paymenttodo");
const authMiddleware = require("../middleware/Auth.js");

//setup paymenttodo routes
class PaymentTodoAPI {
  constructor() {
    this.router = router;
    this.setupRoutes();
  }

  setupRoutes() {
    const router = this.router;

    //added auth middlware in all routes
    router.post("/", authMiddleware(), addPaymentTodo);

    router.delete("/:paymentId", authMiddleware(), softDeletePaymentTodo);

    router.put("/", authMiddleware(), editPaymentTodo);

    router.get("/", authMiddleware(), getPaymentsTodoByUserId);

    router.get("/:paymentId", authMiddleware(), getPaymentTodoById);
  }

  getRouter() {
    return this.router;
  }

  getRouterGroup() {
    return "/paymenttodo";
  }
}

module.exports = PaymentTodoAPI;

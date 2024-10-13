"use strict";

const router = require("express").Router();
const { getNotificationsByUserId } = require("../controller/notifactions");
const authMiddleware = require("../middleware/Auth");

class NotificationAPI {
  constructor() {
    this.router = router;
    this.setupRoutes();
  }

  setupRoutes() {
    const router = this.router;

    router.get("/", authMiddleware(), getNotificationsByUserId);
  }

  getRouter() {
    return this.router;
  }

  getRouterGroup() {
    return "/notifaction";
  }
}

module.exports = NotificationAPI;

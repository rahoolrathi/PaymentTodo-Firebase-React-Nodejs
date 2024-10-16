"use strict";

const router = require("express").Router();
const { getNotificationsByUserId } = require("../controller/notifactions");
const authMiddleware = require("../middleware/Auth");

//Notifications api routes
class NotificationAPI {
  constructor() {
    this.router = router;
    this.setupRoutes();
  }

  setupRoutes() {
    const router = this.router;

    //set auth middleware
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

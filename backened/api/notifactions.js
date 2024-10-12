"use strict";

const router = require("express").Router();
const {} = require("../controller/notifactions");
const authMiddleware = require("../middleware/Auth");

class NotificationAPI {
  constructor() {
    this.router = router;
    this.setupRoutes();
  }

  setupRoutes() {
    const router = this.router;

    // router.get('/:userId', authMiddleware(Object.values(ROLES)), getUser);

    // router.post('/get-user-by-id', authMiddleware(Object.values(ROLES)),  upload().none(),getUserDetails)
  }

  getRouter() {
    return this.router;
  }

  getRouterGroup() {
    return "/notifaction";
  }
}

module.exports = NotificationAPI;

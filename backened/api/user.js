"use strict";

const router = require("express").Router();
const { handleSaveFcmToken } = require("../controller/user");
const authMiddleware = require("../middleware/Auth");

//Notifications api routes
class USERAPI {
  constructor() {
    this.router = router;
    this.setupRoutes();
  }

  setupRoutes() {
    const router = this.router;

    //set auth middleware
    router.post("/save-fcm-token", authMiddleware(), handleSaveFcmToken);
  }

  getRouter() {
    return this.router;
  }

  getRouterGroup() {
    return "/user";
  }
}

module.exports = USERAPI;

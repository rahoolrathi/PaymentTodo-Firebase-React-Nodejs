const { Router } = require("express");
const PaymentTodoAPI = require("./paymenttodo");
const NotificationAPI = require("./notifactions");
class API {
  constructor(app) {
    this.app = app;
    this.router = Router();
    this.routeGroups = [];
  }

  loadRouteGroups() {
    this.routeGroups.push(new PaymentTodoAPI());
    this.routeGroups.push(new NotificationAPI());
  }

  setContentType(req, res, next) {
    res.set("Content-Type", "application/json");
    next();
  }

  registerGroups() {
    this.loadRouteGroups();
    this.routeGroups.forEach((rg) => {
      console.log("Route group: " + rg.getRouterGroup());
      this.app.use(
        "/api" + rg.getRouterGroup(),
        this.setContentType,
        rg.getRouter()
      );
    });
  }
}

module.exports = API;

// cronJobs.js
const cron = require("node-cron");
const { notifyUnpaidPayments } = require("../controller/notifactions");
//set corn job now it will run in every 24 hours

//used corn job so it can create notifcations document in every 24 hours
cron.schedule("0 6 * * *", () => {
  console.log("Running cron job to notify unpaid payments...");
  notifyUnpaidPayments();
});
module.exports = cron;

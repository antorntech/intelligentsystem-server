const express = require("express");
const app = express.Router();

const notificationsController = require("../../controllers/notifications.controller");

app.get("/", notificationsController.getNotifications);
app.get("/recent", notificationsController.getRecentNotifications);
app.get("/:notificationId", notificationsController.singleNotifications);
app.post("/add", notificationsController.addNotifications);
app.put("/update/:notificationId", notificationsController.updateNotifications);
app.delete(
  "/delete/:notificationId",
  notificationsController.deleteNotifications
);

module.exports = app;

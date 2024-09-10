const mongoose = require("mongoose");

// Define the main Training schema
const notificationSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
});

// Export the Notification model
module.exports = mongoose.model(
  "Notification",
  notificationSchema,
  "Notifications"
);

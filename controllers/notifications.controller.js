const Notifications = require("../models/Notifications");

// Get all notifications
module.exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notifications.find({});
    res.status(200).send(notifications);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get recent notifications (last 3)
module.exports.getRecentNotifications = async (req, res) => {
  try {
    const notifications = await Notifications.find({});
    const recentNotifications = notifications.reverse().slice(0, 3);
    res.status(200).send(recentNotifications);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get a single faq by ID
module.exports.singleNotifications = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notifications = await Notifications.findById(notificationId);
    res.status(200).send(notifications);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add a new faq
module.exports.addNotifications = async (req, res) => {
  try {
    console.log(req.body);

    const newNotifications = await Notifications.create(req.body);

    res.status(201).json({
      status: "success",
      message: "New Notification created successfully!",
      data: newNotifications,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Update a faq by ID
module.exports.updateNotifications = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const updatedNotification = await Notifications.findByIdAndUpdate(
      notificationId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedNotification) {
      return res.status(404).json({
        status: "fail",
        message: "Notification not found!",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Notification updated successfully!",
      data: updatedNotification,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Delete a faq by ID
module.exports.deleteNotifications = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const faq = await Notifications.findByIdAndDelete(notificationId);
    res.status(200).json({
      status: "success",
      message: "Notification deleted successfully",
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

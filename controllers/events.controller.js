const Events = require("../models/Events");

module.exports.getEvents = async (req, res) => {
  try {
    const events = await Events.find({});

    res.status(200).send(events);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.getRecentEvents = async (req, res) => {
  try {
    const events = await Events.find({});
    const recentEvents = events.reverse().slice(0, 3);
    res.status(200).send(recentEvents);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.singleEvents = async (req, res) => {
  try {
    const { eventsId } = req.params;
    const events = await Events.findById(eventsId);
    res.status(200).send(events);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports.addEvents = async (req, res) => {
  try {
    // Check if files were uploaded
    if (req.file) {
      Object.assign(req.body, {
        banner: "/uploads/images/" + req.file.filename,
      });
    }

    // Create new Events
    const newEvents = await Events.create(req.body);

    return res.status(201).json({
      status: "success",
      message: "New Events created successfully!",
      data: newEvents,
    });
  } catch (error) {
    console.log(error, "Error");
    res.send("Internal Server Error");
  }
};

module.exports.updateEvents = async (req, res) => {
  try {
    const { eventsId } = req.params;

    if (req.file) {
      Object.assign(req.body, {
        banner: "/uploads/images/" + req.file.filename,
      });
    }

    const newEvents = await Events.findByIdAndUpdate(eventsId, req.body, {
      new: true,
    });

    return res.status(200).json({
      status: "success",
      message: "Data updated successfully!",
      data: newEvents,
    });
  } catch (error) {
    console.log(error, "Error");
    res.send("Internal Server Error");
  }
};

module.exports.deleteEvents = async (req, res) => {
  try {
    const { eventsId } = req.params;
    const events = await Events.findByIdAndDelete(eventsId);
    res.status(200).json({
      status: "success",
      message: "Events deleted successfully",
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
      error: error.message,
    });
  }
};

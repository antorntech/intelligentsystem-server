const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  address: {
    type: String,
  },
  date: {
    type: String,
  },
  eventStartTime: {
    type: String,
  },
  eventEndTime: {
    type: String,
  },
  banner: {
    type: String,
  },
});

module.exports = mongoose.model("Events", eventsSchema, "Events");

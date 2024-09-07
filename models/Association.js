const mongoose = require("mongoose");

const associationSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  link: {
    type: String,
  },
  logo: {
    type: String,
  },
});

module.exports = mongoose.model(
  "Association",
  associationSchema,
  "Association"
);

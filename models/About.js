const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  designation: {
    type: String,
  },
  description: {
    type: String,
  },
  main_banner: {
    type: String,
  },
  home_banner1: {
    type: String,
  },
  home_banner2: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

module.exports = mongoose.model("About", aboutSchema, "About");

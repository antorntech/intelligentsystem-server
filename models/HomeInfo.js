const mongoose = require("mongoose");

const infoCategory = new mongoose.Schema({
  title: {
    type: String,
  },
  link: {
    type: String,
  },
  banner: {
    type: String,
  },
});

const homeInfoSchema = new mongoose.Schema({
  heading: {
    type: String,
  },
  subheading: {
    type: String,
  },
  content: {
    type: String,
  },
  infoCategories: {
    type: [infoCategory], // Array of module objects
    default: [], // Default is an empty array
  },
});

module.exports = mongoose.model("HomeInfo", homeInfoSchema, "HomeInfos");

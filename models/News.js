const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
  },
  date: {
    type: String,
  },
  banner: {
    type: String,
  },
});

module.exports = mongoose.model("News", newsSchema, "News");

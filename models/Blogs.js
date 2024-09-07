const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  details: {
    type: String,
  },
  blockQuote: {
    type: String,
  },
  category: {
    type: String,
  },
  tags: {
    type: [String],
    default: [],
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

module.exports = mongoose.model("Blogs", blogsSchema, "Blogs");

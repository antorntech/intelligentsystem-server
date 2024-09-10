const mongoose = require("mongoose");

// Define the main Training schema
const roadMapSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

// Export the Roadmap model
module.exports = mongoose.model("Roadmap", roadMapSchema, "Roadmaps");

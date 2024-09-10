const mongoose = require("mongoose");

// Define the main Training schema
const servicesSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  details: {
    type: String,
  },
  benefits: {
    type: [String],
    default: [], // Benefits are stored as an array of strings
  },
  offers: {
    type: [String],
    default: [], // Course offers are also stored as an array of strings
  },
  works: {
    type: [String],
    default: [], // Works is an array of strings
  },
  tags: {
    type: [String],
    default: [], // Tags stored as an array
  },
  category: {
    type: String,
  },
  author: {
    type: String,
    default: "Admin", // Default author is "Admin"
  },
  date: {
    type: String,
  },
  banner: {
    type: String, // Assuming this will hold the image URL or file path
  },
});

// Export the Service model
module.exports = mongoose.model("Service", servicesSchema, "Services");

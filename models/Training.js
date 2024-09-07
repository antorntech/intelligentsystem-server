const mongoose = require("mongoose");

// Define the schema for each module
const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  subTitle: {
    type: String,
  },
  lists: {
    type: [String],
    default: [], // Default to an empty array for lists
  },
});

// Define the main Training schema
const trainingSchema = new mongoose.Schema({
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
  courseOffers: {
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
  module: {
    type: [moduleSchema], // Array of module objects
    default: [], // Default is an empty array
  },
});

// Export the Training model
module.exports = mongoose.model("Training", trainingSchema, "Trainings");

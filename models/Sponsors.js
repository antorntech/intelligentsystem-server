const mongoose = require("mongoose");

// Define the main Training schema
const sponsorSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  banner: {
    type: String,
  },
});

// Export the Sponsor model
module.exports = mongoose.model("Sponsor", sponsorSchema, "Sponsors");

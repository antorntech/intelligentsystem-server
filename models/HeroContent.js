const mongoose = require("mongoose");

// Define the HeroContent schema
const heroContentSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  facebookLink: {
    type: String,
  },
  linkedinLink: {
    type: String,
  },
  whatsappNumber: {
    type: String,
  },
  youtubeVideoLink: {
    type: String,
  },
  banner: {
    type: String,
  },
});

// Create the HeroContent model
const HeroContent = mongoose.model(
  "HeroContent",
  heroContentSchema,
  "HeroContent"
);

module.exports = HeroContent;

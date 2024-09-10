const mongoose = require("mongoose");

// Define the main Training schema
const promotionSchema = new mongoose.Schema({
  titleOne: {
    type: String,
  },
  titleTwo: {
    type: String,
  },
  titleThree: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  videoLink: {
    type: String,
  },
});

// Export the Promotion model
module.exports = mongoose.model("Promotion", promotionSchema, "Promotions");

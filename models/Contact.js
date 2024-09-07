const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  facebookUrl: {
    type: String,
  },
  instagramUrl: {
    type: String,
  },
  linkedinUrl: {
    type: String,
  },
  mapUrl: {
    type: String,
  },
});

module.exports = mongoose.model("Contact", contactSchema, "Contact");

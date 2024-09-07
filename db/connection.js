const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/intelligentsystem_db";

const connection = async () => {
  try {
    await mongoose.connect(url);
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connection;

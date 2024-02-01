// src--> config --> dbconnect

// Database connection
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Get Url from Env variables
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected");
  } catch (err) {
    console.log(err);
    console.log("Failed to connect to database");
  }
};

module.exports = connectDB;
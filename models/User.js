const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Coder schema
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  description: String,
  score: Number,
  avatar: String,
});

// Create the models
const User = mongoose.model("User", userSchema);

// Export the models
module.exports = { User };

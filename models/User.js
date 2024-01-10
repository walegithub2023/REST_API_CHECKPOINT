//mount mongoose
const mongoose = require("mongoose");

//define schema for user
const userSchema = new mongoose.Schema({
  // Define your user schema fields
  name: { type: String },
  age: { type: Number },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  role: String,
  contact: String,
  address: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
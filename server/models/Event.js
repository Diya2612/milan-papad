const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  date: String,
  description: String,
  category: String
});

module.exports = mongoose.model("Event", EventSchema);
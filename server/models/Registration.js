const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  eventTitle: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Registration", RegistrationSchema);

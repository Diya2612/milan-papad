const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");

// ✅ Register a user for an event
router.post("/event", async (req, res) => {
  try {
    const { name, email, mobile, eventId, eventTitle } = req.body;

    if (!name || !email || !mobile || !eventId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newReg = new Registration({
      name,
      email,
      mobile,
      eventId,
      eventTitle,
    });

    await newReg.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all registrations (for debugging/admin if needed)
router.get("/", async (req, res) => {
  try {
    const regs = await Registration.find().sort({ createdAt: -1 });
    res.json(regs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

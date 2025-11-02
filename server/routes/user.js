const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  const { fullname, email, password, role, contact, address } = req.body;
  
  // Check if user exists
  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Email already registered" });
  }
  
  const user = new User({ fullname, email, password, role, contact, address });
  await user.save();
  res.json({ success: true, message: "Registration successful" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email, password });
  if (user) {
    res.json({ success: true, user: { id: user._id, fullname: user.fullname, email: user.email, role: user.role } });
  } else {
    res.status(401).json({ success: false, message: "Invalid email or password" });
  }
});

// Get user profile
router.get("/profile/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

module.exports = router;
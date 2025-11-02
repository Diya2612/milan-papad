const Registration = require("../models/Registration");

// @desc    Handle new registration
// @route   POST /api/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { fullname, role, contact, address } = req.body;

    if (!fullname || !role || !contact || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRegistration = new Registration({
      fullname,
      role,
      contact,
      address,
    });

    await newRegistration.save();
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all registrations
// @route   GET /api/register
// @access  Public (can make it private later)
exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

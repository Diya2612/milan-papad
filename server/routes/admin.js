const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Registration = require("../models/Registration"); // ✅ Added for participant viewing

// ✅ Admin Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin123") {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// ✅ Get all events
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Add new event
router.post("/events", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.json(event);
  } catch (err) {
    console.error("Error adding event:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update event
router.put("/events/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    console.error("Error updating event:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete event
router.delete("/events/:id", async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get participants for a specific event
router.get("/event-registrations/:eventId", async (req, res) => {
  try {
    const participants = await Registration.find({ eventId: req.params.eventId }).sort({ createdAt: -1 });
    res.json(participants);
  } catch (err) {
    console.error("Error fetching participants:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

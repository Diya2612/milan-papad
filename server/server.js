const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require('dotenv').config();
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to Database
connectDB();

// Import Routes
const registrationRoutes = require("./routes/registration");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

// API Routes
app.use("/api/register", registrationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "..", "public")));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// Dynamic page routes
app.get("/:page", (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(__dirname, "..", "public", `${page}.html`), (err) => {
    if (err) {
      res.status(404).send("Page not found");
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});
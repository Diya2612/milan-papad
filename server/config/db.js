const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Use environment variable or fallback to your Atlas URI
    const mongoURI = process.env.MONGODB_URI || "mongodb+srv://diyabedmutha09_db_user:WLmga2ahdVsERtbg@cluster0.4pb5f1b.mongodb.net/event_management?retryWrites=true&w=majority&appName=Cluster0";
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("✅ MongoDB connected successfully");
    console.log(`📊 Database: ${mongoose.connection.name}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
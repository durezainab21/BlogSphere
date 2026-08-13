// ==========================================
// MongoDB DNS Configuration
// ==========================================
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

// ==========================================
// Imports
// ==========================================
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// ==========================================
// Load Environment Variables
// ==========================================
dotenv.config();

// ==========================================
// Create Express App
// ==========================================
const app = express();

// ==========================================
// Middleware
// ==========================================
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ==========================================
// MongoDB Connection
// ==========================================
connectDB();

// ==========================================
// Import Routes
// ==========================================
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

// ==========================================
// Default Route
// ==========================================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 BlogSphere Backend API is running!",
  });
});

// ==========================================
// Health Check
// ==========================================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BlogSphere API is healthy ✅",
  });
});

// ==========================================
// API Routes
// ==========================================
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// ==========================================
// 404 Route
// ==========================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
    path: req.originalUrl,
  });
});

// ==========================================
// Error Handler
// ==========================================
app.use((error, req, res, next) => {
  console.error("❌ Server Error:", error);

  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
});

// ==========================================
// Export App for Vercel
// ==========================================
module.exports = app;
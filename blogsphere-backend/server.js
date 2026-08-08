const dns = require("dns");

// ==============================
// MongoDB DNS Configuration
// ==============================
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const app = express();

// ==============================
// Environment Variables
// ==============================
dotenv.config();

// ==============================
// Connect MongoDB
// ==============================
connectDB();

const PORT = process.env.PORT || 5000;

// ==============================
// Middleware
// ==============================
app.use(cors());
app.use(express.json());

// ==============================
// Import Routes
// ==============================
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

// ==============================
// Default Route
// ==============================
app.get("/", (req, res) => {
  res.send("🚀 Welcome to the BlogSphere Backend API!");
});

// ==============================
// API Routes
// ==============================
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// ==============================
// 404 Route
// ==============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ==============================
// Start Server
// ==============================
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
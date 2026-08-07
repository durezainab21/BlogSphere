const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

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
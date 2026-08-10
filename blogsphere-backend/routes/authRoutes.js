const express = require("express");

const router = express.Router();

// ==========================================
// Import Controllers
// ==========================================

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

// ==========================================
// Import Authentication Middleware
// ==========================================

const authMiddleware = require("../middleware/authMiddleware");

// ==========================================
// Register User
// ==========================================

router.post("/register", registerUser);

// ==========================================
// Login User
// ==========================================

router.post("/login", loginUser);

// ==========================================
// Get Logged-in User Profile
// Protected Route
// ==========================================

router.get("/profile", authMiddleware, getProfile);

// ==========================================
// Export Router
// ==========================================

module.exports = router;
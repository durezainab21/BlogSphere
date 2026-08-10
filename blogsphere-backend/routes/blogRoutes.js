
const express = require("express");
const router = express.Router();

// ==========================================
// Import Controllers
// ==========================================

const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// ==========================================
// Import Authentication Middleware
// ==========================================

const authMiddleware = require("../middleware/authMiddleware");

// ==========================================
// Create Blog
// Protected Route
// ==========================================

router.post("/", authMiddleware, createBlog);

// ==========================================
// Get Logged-in User's Blogs
// Protected Route
// ==========================================

router.get("/", authMiddleware, getBlogs);

// ==========================================
// Get Single Blog
// Protected Route
// ==========================================

router.get("/:id", authMiddleware, getBlogById);

// ==========================================
// Update Blog
// Protected Route
// ==========================================

router.put("/:id", authMiddleware, updateBlog);

// ==========================================
// Delete Blog
// Protected Route
// ==========================================

router.delete("/:id", authMiddleware, deleteBlog);

// ==========================================
// Export Router
// ==========================================

module.exports = router;

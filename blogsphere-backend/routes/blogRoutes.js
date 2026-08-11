
const express = require("express");

const router = express.Router();

// ==========================================
// Import Controllers
// ==========================================

const {
  createBlog,
  getBlogs,
  getMyBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// ==========================================
// Authentication Middleware
// ==========================================

const authMiddleware = require("../middleware/authMiddleware");

// ==========================================
// GET ALL PUBLISHED BLOGS
// Public Route
// GET /api/blogs
// ==========================================

router.get("/", getBlogs);

// ==========================================
// GET LOGGED-IN USER'S BLOGS
// Protected Route
// GET /api/blogs/my
// ==========================================

router.get(
  "/my",
  authMiddleware,
  getMyBlogs
);

// ==========================================
// GET SINGLE BLOG
// Public Route
// GET /api/blogs/:id
// ==========================================

router.get(
  "/:id",
  getBlogById
);

// ==========================================
// CREATE BLOG
// Protected Route
// POST /api/blogs
// ==========================================

router.post(
  "/",
  authMiddleware,
  createBlog
);

// ==========================================
// UPDATE BLOG
// Protected Route
// PUT /api/blogs/:id
// ==========================================

router.put(
  "/:id",
  authMiddleware,
  updateBlog
);

// ==========================================
// DELETE BLOG
// Protected Route
// DELETE /api/blogs/:id
// ==========================================

router.delete(
  "/:id",
  authMiddleware,
  deleteBlog
);

// ==========================================
// EXPORT ROUTER
// ==========================================

module.exports = router;


const express = require("express");

const router = express.Router();

// ===============================
// Import Controllers
// ===============================

const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// ===============================
// Create Blog
// ===============================

router.post("/", createBlog);

// ===============================
// Get All Blogs
// ===============================

router.get("/", getBlogs);

// ===============================
// Get Single Blog
// ===============================

router.get("/:id", getBlogById);

// ===============================
// Update Blog
// ===============================

router.put("/:id", updateBlog);

// ===============================
// Delete Blog
// ===============================

router.delete("/:id", deleteBlog);

module.exports = router;
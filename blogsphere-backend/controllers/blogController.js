
const Blog = require("../models/Blog");
const mongoose = require("mongoose");

// ==========================================
// CREATE BLOG
// Protected Route
// POST /api/blogs
// ==========================================

const createBlog = async (req, res) => {
  try {
    console.log("🔥 CREATE BLOG CALLED");
    console.log("Logged-in User:", req.user);

    // ========================================
    // Authentication
    // ========================================

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const {
      title,
      category,
      content,
      status,
    } = req.body || {};

    // ========================================
    // Validation
    // ========================================

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Blog title is required.",
      });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Blog content is required.",
      });
    }

    // ========================================
    // Create Blog
    // ========================================

    const newBlog = await Blog.create({
      user: req.user.id,

      title: title.trim(),

      category:
        category && category.trim()
          ? category.trim()
          : "General",

      content: content.trim(),

      status:
        status === "draft"
          ? "draft"
          : "published",

      author:
        req.user.name ||
        req.user.email ||
        "Anonymous",
    });

    console.log(
      "✅ Blog created:",
      newBlog._id
    );

    return res.status(201).json({
      success: true,
      message: "Blog created successfully 🚀",
      blog: newBlog,
    });
  } catch (error) {
    console.error(
      "❌ Create Blog Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ==========================================
// GET ALL PUBLISHED BLOGS
// Public Route
// GET /api/blogs
// ==========================================

const getBlogs = async (req, res) => {
  try {
    console.log(
      "📚 GET PUBLIC BLOGS CALLED"
    );

    const blogs = await Blog.find({
      status: "published",
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error(
      "❌ Get Blogs Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ==========================================
// GET MY BLOGS
// Protected Route
// GET /api/blogs/my
// ==========================================

const getMyBlogs = async (req, res) => {
  try {
    console.log(
      "👤 GET MY BLOGS CALLED"
    );

    console.log(
      "Logged-in User:",
      req.user
    );

    // ========================================
    // Authentication
    // ========================================

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // ========================================
    // Find ONLY logged-in user's blogs
    // ========================================

    const blogs = await Blog.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    console.log(
      `✅ Found ${blogs.length} blogs for user ${req.user.id}`
    );

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error(
      "❌ Get My Blogs Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ==========================================
// GET SINGLE BLOG
// Public Route
// GET /api/blogs/:id
// ==========================================

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(
      "📖 GET SINGLE BLOG"
    );

    console.log(
      "Blog ID:",
      id
    );

    // ========================================
    // Validate MongoDB ID
    // ========================================

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID.",
      });
    }

    // ========================================
    // Find Blog
    // ========================================

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error(
      "❌ Get Single Blog Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE BLOG
// Protected Route
// PUT /api/blogs/:id
// ==========================================

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(
      "✏️ UPDATE BLOG"
    );

    console.log(
      "Blog ID:",
      id
    );

    console.log(
      "Logged-in User:",
      req.user
    );

    // ========================================
    // Authentication
    // ========================================

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // ========================================
    // Validate ID
    // ========================================

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID.",
      });
    }

    const {
      title,
      category,
      content,
      status,
    } = req.body || {};

    // ========================================
    // Validation
    // ========================================

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Blog title is required.",
      });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Blog content is required.",
      });
    }

    // ========================================
    // Find ONLY user's blog
    // ========================================

    const blog = await Blog.findOne({
      _id: id,
      user: req.user.id,
    });

    // ========================================
    // Blog not found / not owned
    // ========================================

    if (!blog) {
      const existingBlog =
        await Blog.findById(id);

      if (!existingBlog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found.",
        });
      }

      return res.status(403).json({
        success: false,
        message:
          "Access denied. You can only update your own blogs.",
      });
    }

    // ========================================
    // Update
    // ========================================

    blog.title = title.trim();

    blog.category =
      category && category.trim()
        ? category.trim()
        : "General";

    blog.content = content.trim();

    blog.status =
      status === "draft"
        ? "draft"
        : "published";

    // ========================================
    // Keep existing author
    // ========================================

    if (!blog.author) {
      blog.author =
        req.user.name ||
        req.user.email ||
        "Anonymous";
    }

    await blog.save();

    console.log(
      "✅ BLOG UPDATED SUCCESSFULLY"
    );

    return res.status(200).json({
      success: true,
      message:
        "Blog updated successfully ✏️",
      blog,
    });
  } catch (error) {
    console.error(
      "❌ Update Blog Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ==========================================
// DELETE BLOG
// Protected Route
// DELETE /api/blogs/:id
// ==========================================

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(
      "🗑️ DELETE BLOG"
    );

    console.log(
      "Blog ID:",
      id
    );

    console.log(
      "Logged-in User:",
      req.user
    );

    // ========================================
    // Authentication
    // ========================================

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // ========================================
    // Validate ID
    // ========================================

    if (
      !mongoose.Types.ObjectId.isValid(id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID.",
      });
    }

    // ========================================
    // Find ONLY user's blog
    // ========================================

    const blog = await Blog.findOne({
      _id: id,
      user: req.user.id,
    });

    // ========================================
    // Blog not found / not owned
    // ========================================

    if (!blog) {
      const existingBlog =
        await Blog.findById(id);

      if (!existingBlog) {
        return res.status(404).json({
          success: false,
          message: "Blog not found.",
        });
      }

      return res.status(403).json({
        success: false,
        message:
          "Access denied. You can only delete your own blogs.",
      });
    }

    // ========================================
    // Delete
    // ========================================

    await Blog.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    console.log(
      "✅ BLOG DELETED SUCCESSFULLY"
    );

    return res.status(200).json({
      success: true,
      message:
        "Blog deleted successfully 🗑️",
    });
  } catch (error) {
    console.error(
      "❌ Delete Blog Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ==========================================
// EXPORT CONTROLLERS
// ==========================================

module.exports = {
  createBlog,
  getBlogs,
  getMyBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};


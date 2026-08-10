
const Blog = require("../models/Blog");

// ==========================================
// Create Blog
// ==========================================

const createBlog = async (req, res) => {
  try {
    console.log("🔥 CREATE BLOG CALLED");
    console.log("Method:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("Body:", req.body);
    console.log("Logged-in User:", req.user);

    const {
      title,
      category,
      content,
      status,
    } = req.body || {};

    // ========================================
    // Check Authentication
    // ========================================

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // ========================================
    // Validation
    // ========================================

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and Content are required.",
      });
    }

    // ========================================
    // Create Blog
    // ========================================
    // IMPORTANT:
    // User ID comes from the verified JWT.
    // We do NOT trust user ID from frontend.

    const newBlog = await Blog.create({
      user: req.user.id,
      title,
      category: category || "General",
      content,
      status: status || "published",
      author: req.user.name || req.user.email || "Anonymous",
    });

    // ========================================
    // Response
    // ========================================

    res.status(201).json({
      success: true,
      message: "Blog created successfully 🚀",
      blog: newBlog,
    });

  } catch (error) {
    console.log("Create Blog Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ==========================================
// Get Logged-in User's Blogs
// ==========================================

const getBlogs = async (req, res) => {
  try {
    console.log("📚 GET USER BLOGS CALLED");
    console.log("Method:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("Logged-in User:", req.user);

    // ========================================
    // Check Authentication
    // ========================================

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // ========================================
    // Get ONLY logged-in user's blogs
    // ========================================

    const blogs = await Blog.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    // ========================================
    // Response
    // ========================================

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });

  } catch (error) {
    console.log("Get Blogs Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ==========================================
// Get Single Blog
// ==========================================

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("📖 GET SINGLE BLOG");
    console.log("Blog ID:", id);

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      blog,
    });

  } catch (error) {
    console.log("Get Single Blog Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ==========================================
// Update Blog
// ==========================================

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("✏️ UPDATE BLOG");
    console.log("Blog ID:", id);
    console.log("Updated Data:", req.body);
    console.log("Logged-in User:", req.user);

    // ========================================
    // Check Authentication
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

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and Content are required.",
      });
    }

    // ========================================
    // Find Blog
    // ========================================

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // ========================================
    // Check Blog Ownership
    // ========================================

    if (blog.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only update your own blogs.",
      });
    }

    // ========================================
    // Update Blog
    // ========================================

    blog.title = title;
    blog.category = category || "General";
    blog.content = content;
    blog.status = status || "published";

    await blog.save();

    // ========================================
    // Response
    // ========================================

    res.status(200).json({
      success: true,
      message: "Blog updated successfully ✏️",
      blog,
    });

  } catch (error) {
    console.log("Update Blog Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ==========================================
// Delete Blog
// ==========================================

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("🗑️ DELETE BLOG");
    console.log("Blog ID:", id);
    console.log("Logged-in User:", req.user);

    // ========================================
    // Check Authentication
    // ========================================

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // ========================================
    // Find Blog
    // ========================================

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // ========================================
    // Check Blog Ownership
    // ========================================

    if (blog.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only delete your own blogs.",
      });
    }

    // ========================================
    // Delete Blog
    // ========================================

    await Blog.findByIdAndDelete(id);

    // ========================================
    // Response
    // ========================================

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully 🗑️",
    });

  } catch (error) {
    console.log("Delete Blog Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ==========================================
// Export Controllers
// ==========================================

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};

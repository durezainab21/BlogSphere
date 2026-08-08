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

    const {
      title,
      category,
      content,
      status,
      author,
    } = req.body || {};

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and Content are required.",
      });
    }

    // Create blog in MongoDB
    const newBlog = await Blog.create({
      title,
      category: category || "General",
      content,
      status: status || "published",
      author: author || "Anonymous",
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
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
// Get All Blogs
// ==========================================

const getBlogs = async (req, res) => {
  try {
    console.log("📚 GET BLOGS CALLED");
    console.log("Method:", req.method);
    console.log("URL:", req.originalUrl);

    const blogs = await Blog.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      blogs: blogs,
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
      blog: blog,
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
// Delete Blog
// ==========================================

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("🗑️ DELETE BLOG");
    console.log("Blog ID:", id);

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
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
  deleteBlog,
};


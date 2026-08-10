
const mongoose = require("mongoose");

// ==========================================
// Blog Schema
// ==========================================

const blogSchema = new mongoose.Schema(
  {
    // ========================================
    // Blog Owner
    // ========================================
    // This stores the MongoDB ID of the
    // logged-in user who created the blog.

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ========================================
    // Blog Title
    // ========================================

    title: {
      type: String,
      required: true,
      trim: true,
    },

    // ========================================
    // Blog Category
    // ========================================

    category: {
      type: String,
      required: true,
      trim: true,
    },

    // ========================================
    // Blog Content
    // ========================================

    content: {
      type: String,
      required: true,
    },

    // ========================================
    // Blog Author Name
    // ========================================
    // We keep this field for displaying the
    // author's name on the frontend.

    author: {
      type: String,
      default: "Anonymous",
      trim: true,
    },

    // ========================================
    // Blog Status
    // ========================================

    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// Export Blog Model
// ==========================================

module.exports = mongoose.model("Blog", blogSchema);

// ==========================================
// Temporary Blog Storage
// ==========================================

let blogs = [
  {
    id: 1,
    title: "Welcome to BlogSphere",
    category: "Technology",
    content: "This is my first blog post 🚀",
    status: "published",
    createdAt: new Date(),
  },
];


// ==========================================
// Create Blog
// ==========================================

const createBlog = (req, res) => {
  try {
    const {
      title,
      category,
      content,
      status,
    } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and Content are required.",
      });
    }

    // Create new blog
    const newBlog = {
      id: Date.now(),
      title,
      category: category || "General",
      content,
      status: status || "published",
      createdAt: new Date(),
    };

    // Save blog
    blogs.push(newBlog);

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
    });
  }
};


// ==========================================
// Get All Blogs
// ==========================================

const getBlogs = (req, res) => {
  try {
    res.json({
      success: true,
      blogs: blogs,
    });

  } catch (error) {
    console.log("Get Blogs Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// ==========================================
// Get Single Blog
// ==========================================

const getBlogById = (req, res) => {
  try {
    const { id } = req.params;

    const blog = blogs.find(
      (item) => String(item.id) === String(id)
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      blog: blog,
    });

  } catch (error) {
    console.log("Get Single Blog Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// ==========================================
// Delete Blog
// ==========================================

const deleteBlog = (req, res) => {
  try {
    const { id } = req.params;

    // Check if blog exists
    const blogExists = blogs.some(
      (item) => String(item.id) === String(id)
    );

    if (!blogExists) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Remove blog
    blogs = blogs.filter(
      (item) => String(item.id) !== String(id)
    );

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });

  } catch (error) {
    console.log("Delete Blog Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
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
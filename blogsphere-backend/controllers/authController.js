const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ======================================================
// Register User
// ======================================================

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ==================================================
    // Validation
    // ==================================================

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields.",
      });
    }

    // ==================================================
    // Check Existing User
    // ==================================================

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    // ==================================================
    // Hash Password
    // ==================================================

    const hashedPassword = await bcrypt.hash(password, 10);

    // ==================================================
    // Create User
    // ==================================================

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // ==================================================
    // Send Response
    // ==================================================

    res.status(201).json({
      success: true,
      message: "User Registered Successfully 🚀",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error while registering user.",
    });
  }
};

// ======================================================
// Login User
// ======================================================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ==================================================
    // Validation
    // ==================================================

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required.",
      });
    }

    // ==================================================
    // Find User
    // ==================================================

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // ==================================================
    // Compare Password
    // ==================================================

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // ==================================================
    // Check JWT Secret
    // ==================================================

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing from .env");

      return res.status(500).json({
        success: false,
        message: "JWT configuration is missing.",
      });
    }

    // ==================================================
    // Generate JWT Token
    // ==================================================

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // ==================================================
    // Send Login Response
    // ==================================================

    res.status(200).json({
      success: true,
      message: "User Logged In Successfully 🚀",
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error while logging in.",
    });
  }
};

// ======================================================
// Get Logged-in User Profile
// Protected Route
// ======================================================

const getProfile = async (req, res) => {
  try {
    // User ID comes from JWT authentication middleware
    const userId = req.user.id;

    // Find user and exclude password
    const user = await User.findById(userId).select("-password");

    // Check user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ==================================================
    // Send Profile
    // ==================================================

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully 🚀",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Get Profile Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error while fetching profile.",
    });
  }
};

// ======================================================
// Export Controllers
// ======================================================

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
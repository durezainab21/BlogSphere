// ===============================
// Register User
// ===============================
const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all fields.",
    });
  }

  res.status(201).json({
    success: true,
    message: "User Registered Successfully 🚀",
    user: {
      name,
      email,
      password,
    },
  });
};

// ===============================
// Login User
// ===============================
const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and Password are required.",
    });
  }

  res.status(200).json({
    success: true,
    message: "User Logged In Successfully 🚀",
    user: {
      email,
    },
  });
};

module.exports = {
  registerUser,
  loginUser,
};
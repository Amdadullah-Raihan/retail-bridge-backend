// controllers/user.controller.js
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    // Create new user
    const user = new User({ username, email, password, role });
    const newUser = await user.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Invalid data", errors: err.errors });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid credentials");
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

module.exports = {
  registerUser,
  loginUser,
};

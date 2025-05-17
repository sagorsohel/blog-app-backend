const User = require("../models/user.model");

const generateToken = require("../utils/generateToken");

const bcrypt = require("bcrypt");
const saltRounds = 10;


async function signUp(req, res) {
  const { name, email, password, phone } = req.body;
  try {

    // Check user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Validate user input

    const user = await User.create({ name, email, password, phone });

    const newUser = await User.findById(user._id).select("-password");
    res.status(201).json({
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error,
    });
  }
}

// Login function

async function login(req, res) {
  const { email, password } = req.body || {}; // Fallback to empty object

  try {
    // Validate user input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }


    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate token
    const token = generateToken(user._id);
    res.status(200).json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
}






// Export the signUp function

module.exports = {
    signUp,
    login,
}

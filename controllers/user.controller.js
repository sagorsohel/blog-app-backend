const User = require("../models/user.model");

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

module.exports = signUp;

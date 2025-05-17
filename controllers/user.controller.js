async function signUp(req, res) {
  const { name, email, password, phone } = req.body;
  try {
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

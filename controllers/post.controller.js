const Post = require("../models/post.model");

async function createPost(req, res) {
  console.log(req.user);

  console.log(req.body);
  const { title, description, content, coverPhoto, status } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title are required" });
  }

  await Post.create({
    title,
    description,
    content,
    coverPhoto,
    status,
    createdBy: req.user._id,
  });
  return res.status(201).json({
    message: "Post created successfully",
    success: true,
    data: {
      title,
      description,
      content,
      coverPhoto,
      status,
      createdBy: req.user._id,
    },
  });
}

module.exports = { createPost };

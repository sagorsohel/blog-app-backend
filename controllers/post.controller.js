const Post = require("../models/post.model");




async function getPosts(req, res) {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const posts = await Post.find()
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "name email");

    const totalPosts = await Post.countDocuments();

    return res.status(200).json({
      message: "Posts fetched successfully",
      success: true,
      data: posts,
      totalPosts,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


async function createPost(req, res) {
  
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

module.exports = { createPost,getPosts };

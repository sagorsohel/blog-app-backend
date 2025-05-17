const { Router } = require("express");
const protect = require("../middlewares/auth.middleware");
const { createPost } = require("../controllers/post.controller");
const router = Router();

router.post("/create", protect, createPost);

module.exports = router;

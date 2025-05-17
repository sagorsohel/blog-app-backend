const { Router } = require("express");
const protect = require("../middlewares/auth.middleware");
const { createPost,getPosts } = require("../controllers/post.controller");
const router = Router();

router.get("/get-post", protect, getPosts);
router.post("/create", protect, createPost);

module.exports = router;

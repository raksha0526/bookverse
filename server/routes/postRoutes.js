const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  addComment,
  deletePost,
  likePost,
  updatePost,
} = require("../controllers/postController");

const {
  protect,
} = require("../middleware/authMiddleware");


router.post("/", protect, createPost);
router.get("/", getPosts);
router.put(
  "/:id/comment",
  protect,
  addComment
);
router.delete(
  "/:id",
  protect,
  deletePost
);
router.post(
  "/:id/like",
  protect,
  likePost
);
router.put(
  "/:id",
  protect,
  updatePost
);


module.exports = router;
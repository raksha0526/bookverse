const express = require("express");
const router = express.Router();

const upload = require(
  "../middleware/uploadMiddleware"
);

const {
  createPost,
  getPosts,
  addComment,
  deletePost,
  likePost,
  getPostById,
  updatePost,
} = require("../controllers/postController");

const {
  protect,
} = require("../middleware/authMiddleware");


router.post(
  "/",
  protect,
  upload.single("coverImage"),
  createPost
);
router.get("/", getPosts);

router.get(
  "/:id",
  getPostById
);


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
  upload.single("coverImage"),
  updatePost
);


module.exports = router;
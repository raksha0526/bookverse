const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  updateUserProfile,
  getMyPosts,
} = require("../controllers/userController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.get("/my-posts", protect, getMyPosts);

router.get("/:id", getUserProfile);

router.put(
  "/:id",
  protect,
  updateUserProfile
);

module.exports = router;
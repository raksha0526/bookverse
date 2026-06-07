const User = require("../models/User");
const Post = require("../models/Post");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password");

    const posts = await Post.find({
      author: req.params.id,
    }).sort({ createdAt: -1 });

    res.json({
      user,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {


    if (req.user._id.toString() !== req.params.id) {
  return res.status(403).json({
    message: "Not authorized",
  });
}
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.username =
      req.body.username || user.username;

    user.bio =
      req.body.bio || user.bio;

    user.interests =
      req.body.interests || user.interests;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
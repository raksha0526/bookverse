const Post = require("../models/Post");
const Notification = require("../models/Notification");

const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const post = await Post.create({
      title,
      content,
      author,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPosts = async (req, res) => {
  try {
   const posts = await Post.find()
  .populate("author", "username")
  .populate("comments.user", "username")
  .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addComment = async (
  req,
  res
) => {
  try {
    const post = await Post.findById(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    post.comments.push({
      user: req.user._id,
      text: req.body.text,
    });

    await post.save();

if (
  post.author.toString() !==
  req.user._id.toString()
) {
  await Notification.create({
    recipient: post.author,
    sender: req.user._id,
    type: "comment",
    post: post._id,
  });
}


    const updatedPost =
      await Post.findById(post._id)
        .populate("author", "username")
        .populate(
          "comments.user",
          "username"
        );

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (
      post.author.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await post.deleteOne();

    res.json({
      message: "Review deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const likePost = async (req, res) => {
  try {
    const post = await Post.findById(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const alreadyLiked =
      post.likes.includes(
        req.user._id
      );

    if (alreadyLiked) {
      // UNLIKE
      post.likes.pull(
        req.user._id
      );

      await Notification.deleteOne({
        sender: req.user._id,
        recipient: post.author,
        post: post._id,
        type: "like",
      });
    } else {
      // LIKE
      post.likes.push(
        req.user._id
      );

      if (
        post.author.toString() !==
        req.user._id.toString()
      ) {
        await Notification.create({
          sender: req.user._id,
          recipient: post.author,
          post: post._id,
          type: "like",
        });
      }
    }

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(
      req.params.id
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (
      post.author.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    post.title =
      req.body.title || post.title;

    post.content =
      req.body.content ||
      post.content;

    const updatedPost =
      await post.save();

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createPost,
  getPosts,
  updatePost,
  addComment,
  deletePost,
  likePost,
};
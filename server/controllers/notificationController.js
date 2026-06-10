const Notification = require(
  "../models/Notification"
);

const getNotifications =
  async (req, res) => {
    try {
      const notifications =
        await Notification.find({
          recipient: req.user._id,
        })
          .populate(
            "sender",
            "username"
          )
          .populate(
            "post",
            "title"
          )
          .sort({
            createdAt: -1,
          });

      res.json(notifications);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  getNotifications,
};
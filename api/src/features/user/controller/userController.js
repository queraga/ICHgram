import { User } from "../../../entities/user/model/User.js";
import { Post } from "../../../entities/post/model/Post.js";

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateMe = async (req, res) => {
  try {
    const { username, website, bio } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        username,
        website,
        bio,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      author: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      posts,
      postsCount: posts.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

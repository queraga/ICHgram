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

export const toggleFollow = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.userId;

    const targetUser = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (targetUser._id.toString() === currentUser._id.toString()) {
      return res.status(403).json({
        message: "You cannot follow yourself",
      });
    }

    const hasFollowed = currentUser.following.some(
      (followId) => followId.toString() === userId,
    );

    if (hasFollowed) {
      currentUser.following = currentUser.following.filter(
        (followId) => followId.toString() !== userId,
      );

      targetUser.followers = targetUser.followers.filter(
        (followerId) => followerId.toString() !== currentUserId,
      );
    } else {
      currentUser.following.push(userId);
      targetUser.followers.push(currentUserId);
    }
    await currentUser.save();
    await targetUser.save();

    res.status(200).json({
      message: hasFollowed
        ? `You unfollowed ${targetUser.username}`
        : `You followed ${targetUser.username}`,
      followersCount: targetUser.followers.length,
      isFollowing: !hasFollowed,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.userId;

    const targetUser = await User.findById(userId);

    if (!targetUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const currentUser = await User.findById(currentUserId);

    const followersCount = targetUser.followers.length;
    const followingCount = targetUser.following.length;

    const isFollowing = currentUser.following.some(
      (followId) => followId.toString() === userId,
    );

    const postsCount = await Post.countDocuments({
      author: userId,
    });

    res.status(200).json({
      user: {
        id: targetUser.id,
        username: targetUser.username,
        fullName: targetUser.fullName,
        avatarUrl: targetUser.avatarUrl,
        bio: targetUser.bio,
        website: targetUser.website,
      },
      postsCount,
      followersCount,
      followingCount,
      isFollowing,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const posts = await Post.find({
      author: userId,
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

export const updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Avatar image is required",
      });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    await user.save();
    res.status(200).json({
      message: "Avatar updated successfully",
      avatarUrl: user.avatarUrl,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q?.trim()) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const users = await User.find({
      $or: [
        {
          username: {
            $regex: q,
            $options: "i",
          },
        },
        {
          fullName: {
            $regex: q,
            $options: "i",
          },
        },
      ],
    }).select("username fullName avatarUrl");

    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

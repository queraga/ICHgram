import { Post } from "../../../entities/post/model/Post.js";

export const createPost = async (req, res) => {
  try {
    const { imageUrl, caption } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        message: "Image URL is required",
      });
    }

    const post = await Post.create({
      author: req.user.userId,
      imageUrl,
      caption,
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username fullName avatarUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const hasLiked = post.likes.some((likeId) => likeId.toString() === userId);

    if (hasLiked) {
      post.likes = post.likes.filter((likeId) => likeId.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      message: hasLiked ? "Like removed" : "Post liked",
      likesCount: post.likes.length,
      likes: post.likes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

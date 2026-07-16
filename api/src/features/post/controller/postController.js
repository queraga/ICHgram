import { Post } from "../../../entities/post/model/Post.js";
import { Comment } from "../../../entities/comment/model/Comment.js";

export const createPost = async (req, res) => {
  try {
    const { caption } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Post image is required",
      });
    }

    const imageUrl = `/uploads/posts/${req.file.filename}`;

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

export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate(
      "author",
      "username fullName avatarUrl",
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const comments = await Comment.find({ post: postId })
      .populate("author", "username fullName avatarUrl")
      .sort({ createdAt: 1 });

    res.status(200).json({
      post,
      comments,
      commentsCount: comments.length,
      likesCount: post.likes.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { caption } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can edit only your own posts",
      });
    }

    post.caption = caption ?? post.caption;

    await post.save();

    res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.author.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can delete only your own posts",
      });
    }

    await Comment.deleteMany({ post: postId });
    await post.deleteOne();

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

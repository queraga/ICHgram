import { Comment } from "../../../entities/comment/model/Comment.js";
import { Post } from "../../../entities/post/model/Post.js";

export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({
        message: "Comment text is required",
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const comment = await Comment.create({
      author: req.user.userId,
      post: postId,
      text,
    });

    res.status(201).json({
      message: "Comment created successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("author", "username fullName avatarUrl")
      .sort({ createdAt: 1 });

    res.status(200).json({
      comments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const toggleCommentLike = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.userId;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    const hasLiked = comment.likes.some(
      (likeId) => likeId.toString() === userId,
    );

    if (hasLiked) {
      comment.likes = comment.likes.filter(
        (likeId) => likeId.toString() !== userId,
      );
    } else {
      comment.likes.push(userId);
    }

    await comment.save();

    res.status(200).json({
      message: hasLiked ? "Comment like removed" : "Comment liked",
      likesCount: comment.likes.length,
      likes: comment.likes,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

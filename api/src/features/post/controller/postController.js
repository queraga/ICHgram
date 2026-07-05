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

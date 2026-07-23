import express from "express";
import { authMiddleware } from "../../../shared/middleware/authMiddleware.js";
import {
  createPost,
  getPosts,
  getPostById,
  toggleLike,
  updatePost,
  deletePost,
  getFeedPosts,
} from "../controller/postController.js";
import { uploadPostImage } from "../../../shared/middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, uploadPostImage.single("image"), createPost);
router.get("/", authMiddleware, getPosts);
router.get("/feed", authMiddleware, getFeedPosts);
router.patch("/:postId/like", authMiddleware, toggleLike);
router.get("/:postId", authMiddleware, getPostById);
router.patch("/:postId", authMiddleware, updatePost);
router.delete("/:postId", authMiddleware, deletePost);

export default router;

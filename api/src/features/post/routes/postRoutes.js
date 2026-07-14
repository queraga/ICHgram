import express from "express";

import { authMiddleware } from "../../../shared/middleware/authMiddleware.js";
import {
  createPost,
  getPosts,
  getPostById,
  toggleLike,
  updatePost,
  deletePost,
} from "../controller/postController.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", authMiddleware, getPosts);
router.patch("/:postId/like", authMiddleware, toggleLike);
router.get("/:postId", authMiddleware, getPostById);
router.patch("/:postId", authMiddleware, updatePost);
router.delete("/:postId", authMiddleware, deletePost);

export default router;

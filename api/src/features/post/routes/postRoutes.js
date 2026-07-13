import express from "express";

import { authMiddleware } from "../../../shared/middleware/authMiddleware.js";
import {
  createPost,
  getPosts,
  toggleLike,
} from "../controller/postController.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", authMiddleware, getPosts);
router.patch("/:postId/like", authMiddleware, toggleLike);

export default router;

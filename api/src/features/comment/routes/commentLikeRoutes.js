import express from "express";
import { toggleCommentLike } from "../controller/commentController.js";
import { authMiddleware } from "../../../shared/middleware/authMiddleware.js";

const router = express.Router();

router.patch("/:commentId/like", authMiddleware, toggleCommentLike);

export default router;

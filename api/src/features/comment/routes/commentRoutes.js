import express from "express";
import { authMiddleware } from "../../../shared/middleware/authMiddleware.js";
import { createComment, getComments } from "../controller/commentController.js";

const router = express.Router();

router.post("/:postId/comments", authMiddleware, createComment);
router.get("/:postId/comments", authMiddleware, getComments);

export default router;

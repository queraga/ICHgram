import express from "express";
import { createPost } from "../controller/postController.js";
import { authMiddleware } from "../../../shared/middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);

export default router;

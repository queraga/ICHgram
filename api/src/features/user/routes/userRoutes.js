import express from "express";
import { getMe, updateMe, getMyPosts } from "../controller/userController.js";
import { authMiddleware } from "../../../shared/middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.get("/me/posts", authMiddleware, getMyPosts);
router.patch("/me", authMiddleware, updateMe);

export default router;

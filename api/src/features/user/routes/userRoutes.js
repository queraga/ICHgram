import express from "express";
import {
  getMe,
  updateMe,
  getMyPosts,
  toggleFollow,
  getUserById,
  getUserPosts,
  updateAvatar,
  searchUsers,
} from "../controller/userController.js";
import { authMiddleware } from "../../../shared/middleware/authMiddleware.js";
import { uploadAvatar } from "../../../shared/middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.get("/me/posts", authMiddleware, getMyPosts);
router.patch("/me", authMiddleware, updateMe);
router.patch(
  "/me/avatar",
  authMiddleware,
  uploadAvatar.single("avatar"),
  updateAvatar,
);
router.get("/search", authMiddleware, searchUsers);
router.patch("/:userId/follow", authMiddleware, toggleFollow);
router.get("/:userId/posts", authMiddleware, getUserPosts);
router.get("/:userId", authMiddleware, getUserById);

export default router;

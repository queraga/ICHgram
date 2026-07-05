import express from "express";
import { getMe } from "../controller/userController.js";
import { authMiddleware } from "../../../shared/middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getMe);

export default router;

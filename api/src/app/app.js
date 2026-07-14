import express from "express";
import cors from "cors";
import authRoutes from "../features/auth/routes/authRoutes.js";
import userRoutes from "../features/user/routes/userRoutes.js";
import postRoutes from "../features/post/routes/postRoutes.js";
import commentRoutes from "../features/comment/routes/commentRoutes.js";
import commentLikeRoutes from "../features/comment/routes/commentLikeRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts", commentRoutes);
app.use("/api/comments", commentLikeRoutes);

app.get("/", (req, res) => {
  res.send("Instagram clone API is running");
});

export default app;

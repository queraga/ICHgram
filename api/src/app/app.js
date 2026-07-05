import express from "express";
import cors from "cors";
import authRoutes from "../features/auth/routes/authRoutes.js";
import userRoutes from "../features/user/routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Instagram clone API is running");
});

export default app;

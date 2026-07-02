import express from "express";
import cors from "cors";
import authRoutes from "../features/auth/routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Instagram clone API is running");
});

export default app;

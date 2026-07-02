import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "../shared/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 7777;

async function startServer() {
  await connectDB();
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

startServer();

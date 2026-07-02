import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => {
  console.log(`Server is runnin on https://localhost:${PORT}`);
});

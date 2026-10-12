import express from "express";
import cors from "cors";
import router from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
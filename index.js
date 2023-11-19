import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserRouter } from "./DB/Router/UserRouter.js";
import cors from "cors";
import Verifytoken from "./Authentication/auth.js";
import { NotesRouter } from "./DB/Router/NotesRouter.js";

dotenv.config();

const PORT = 9000 || process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.mongoURL)
  .then(() => console.log("Connected to MomgoDB"))
  .catch((error) => console.log("Error Connecting to MongoDB", error.message));

app.get("/", async (req, res) => {
  res.status(200).json({ Task: "Notes Application" });
});
app.use("/auth", UserRouter);
app.use("/notes", Verifytoken, NotesRouter);

app.listen(PORT, () => console.log(`Server running in localhost:${PORT}`));

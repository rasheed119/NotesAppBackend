import express from "express";
import { NotesModel } from "../Model/NotesModel.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  try {
    const { title, description, user_id } = req.body;
    const save_note = await NotesModel({ title, description, user_id });
    await save_note.save();
    res.status(200).json({ message: "Notes Created Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: `${error.message}` });
  }
});

router.put("/edit/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, description } = req.body;
    await NotesModel.findOneAndUpdate(
      { _id },
      { $set: { title, description } }
    );
    res.status(200).json({ message: "Notes Edited Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: `${error.message}` });
  }
});

router.delete("/delete/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    await NotesModel.findByIdAndDelete(_id);
    res.status(200).json({ message: "Notes Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: `${error.message}` });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const find_notes = await NotesModel.find({ user_id: id });
    res.status(200).json({ find_notes, message: "notes fetched Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: `${error.message}` });
  }
});

router.get("/getone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const find_note = await NotesModel.findOne({ _id: id });
    res.status(200).json({ find_note });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ Error: `${error.message}` });
  }
});

export { router as NotesRouter };

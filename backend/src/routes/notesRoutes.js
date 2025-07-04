import express from "express"
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../controllers/notesControllers.js";

var router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
router.get('/login', function(req, res, next) {
  res.render('login');
});


export default router
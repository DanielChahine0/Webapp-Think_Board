// Bring in the Express framework
import express from "express"

// Import the controller functions that handle each endpoint’s logic
import { 
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote 
} from "../controllers/notesControllers.js";

// Initialize a new router instance
const router = express.Router();

/* ---------- REST API routes for /api/notes ---------- */

// GET /api/notes        → return all notes (sorted, filtered, etc. in the controller)
router.get("/", getAllNotes);
// GET /api/notes/:id    → return a single note by its MongoDB _id
router.get("/:id", getNoteById);
// POST /api/notes       → add a new note (expects JSON in request body)
router.post("/", createNote);
// PUT /api/notes/:id    → update an existing note by _id
router.put("/:id", updateNote);
// DELETE /api/notes/:id → delete a note by _id
router.delete("/:id", deleteNote);

/* ---------- Export the router so it can be mounted in app.js ---------- */
export default router
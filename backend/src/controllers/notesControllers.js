/**
 * Notes Controller
 * -----------------
 * Express route handlers that implement CRUD operations for `Note` documents.
 * Each handler is asynchronous, catches its own errors, and responds with JSON.
 *
 * End-points
 * ----------
 *  GET    /notes          → getAllNotes
 *  GET    /notes/:id      → getNoteById
 *  POST   /notes          → createNote
 *  PATCH  /notes/:id      → updateNote
 *  DELETE /notes/:id      → deleteNote
 */

import Note from "../models/Note.js"

/**
 * GET /notes
 * Retrieve **all** notes, ordered from newest to oldest.
 */
export async function getAllNotes(_, res) {
    try {
        // `createdAt` index (descending) makes the query efficient and returns the most recently created note first.
        const notes = await Note.find().sort({createdAt:-1}); 
        res.status(200).json(notes);
    } catch (error) {
        // If anything goes wrong, then print the error and exit with status 500
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};

/**
 * GET /notes/:id
 * Retrieve a single note by its MongoDB ObjectId.
 */
export async function getNoteById(req, res){
    try {
        // Get the body of the id of the parameter passed in the URL and look for the note with that Id
        const note = await Note.findById(req.params.id, {new: true});
        
        if (!note) {
            // Client supplied an id that does not exist
            res.status(404).json({message:"Note Not Found"});
        }

        res.status(200).json(note);
    } catch (error) {
        // If anything goes wrong, then print the error and exit with status 500
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

/**
 * POST /notes
 * Body → { title: String, content: String }
 * Create and persist a new note.
 */
export async function createNote(req, res) {
    try {
        // Get the body of the request
        const {title, content} = req.body;

        // Simple guard — use a proper validator (e.g. Zod) in production
        if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
        }


        const note = new Note ({title, content});
        const savedNote = await note.save();
        // Status 201 for an ok, and print the newly created note
        res.status(201).json(savedNote)
    } catch (error) {
        // If anything goes wrong, then print the error and exit with status 500
        console.error("Error in createNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};

/**
 * PATCH /notes/:id
 * Update the title and/or content of an existing note.
 */
export async function updateNote(req, res) {
    try {
        // Build the update object dynamically so undefined values are NOT persisted
        const update = {};
        if (title !== undefined) update.title = title;
        if (content !== undefined) update.content = content;

        // Search the note with the id parameter passed through the URL
        const note = await Note.findByIdAndUpdate(
        req.params.id,
        update,
        {
            new: true,          // return the modified doc
            runValidators: true // honour schema validation rules
        }
        );

        // If the id parameter is not found, then return with status 404
        if (!updatedNote) {
            return res.status(404).json({message:"Note Not Found"});
        }
        
        // Otherwise, return with status 200 for ok
        res.status(200).json(updatedNote);
    } catch (error) {
        // If anything goes wrong, then print the error and exit with status 500
        console.error("Error in updateNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};

/**
 * DELETE /notes/:id
 * Remove a note permanently.
 */
export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({message:"Note Not Found"});
        }
        
        // Otherwise, return with status 200 for ok
        res.status(200).json(deletedNote);
    } catch (error) {
        // If anything goes wrong, then print the error and exit with status 500
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};
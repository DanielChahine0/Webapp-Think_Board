import Note from "../models/Note.js"

export async function getAllNotes(_, res) {
    try {
        // Find and print the list of notes
        const notes = await Note.find().sort({createdAt:-1}); //newest one at the top 
        res.status(200).json(notes);
    } catch (error) {
        // If anything goes wrong, then print the error and exit with status 500
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export async function getNoteById(req, res){
    try {
        // Get the body of the id of the parameter passed in the URL and look for the note with that Id
        const note = await Note.findById(req.params.id, {new: true});
        if (!note) res.status(404).json({message:"Note Not Found"});
        res.status(200).json(note);
    } catch (error) {
        // If anything goes wrong, then print the error and exit with status 500
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function createNote(req, res) {
    try {
        // Get the body of the request
        const {title, content} = req.body;
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

export async function updateNote(req, res) {
    try {
        // Get the body of the request
        const {title, content} = req.body;
        // Search the note with the id parameter passed through the URL
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title, content}, 
            {new: true},
        );
        // If the id parameter is not found, then return with status 404
        if (!updatedNote) return res.status(404).json({message:"Note Not Found"});
        // Otherwise, return with status 200 for ok
        res.status(200).json(updatedNote);
    } catch (error) {
        // If anything goes wrong, then print the error and exit with status 500
        console.error("Error in updateNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({message:"Note Not Found"});
        // Otherwise, return with status 200 for ok
        res.status(200).json(deletedNote);
    } catch (error) {
        // If anything goes wrong, then print the error and exit with status 500
        console.error("Error in updateNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};
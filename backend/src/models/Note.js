/**
 * Note model: represents a single user note.
 * Includes validation, indexes, and cleaner JSON output.
 */
import mongoose from "mongoose";

// 1. Create a schema
// 2. Create a model based of that schema

const noteSchema = new mongoose.Schema({
    title:{
        type: String, 
        required: [true, "Title is required"],
        // trim: true,

    },

    content:{
        type: String,
        required: true,
    },

}, 
{timestamps: true} // Mongodb gives created at and updated at time
);

const Note = mongoose.model("Note", noteSchema);

export default Note
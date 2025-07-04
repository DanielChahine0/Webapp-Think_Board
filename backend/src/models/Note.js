/**
 * Note model: represents a single user note.
 * Includes validation, indexes, and cleaner JSON output.
 *      1. Create a schema
 *      2. Create a model based of that schema
 */
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title:{
            type: String, 
            required: [true, "Title is required"],
            trim: true,
            minlength: [1, "Title cannot be empty"],
            maxlength: [120, "Title can't exceed 120 characters"],
            unique: true,
        },
        content:{
            type: String,
            required: [true, "Content is required"],
            trim: true,
            minlength: [1, "Content cannot be empty"],
        },
    },
    {   
        timestamps: true,       // Mongodb gives created at and updated at time
        versionKey: false,      // removes __v version field
    } 
);
// Enable full‑text search on title & content
noteSchema.index({ title: "text", content: "text" });

// Index to quickly fetch newest notes
noteSchema.index({ createdAt: -1 });

const Note = mongoose.model("Note", noteSchema);

export default Note
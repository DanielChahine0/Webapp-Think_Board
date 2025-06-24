// I'm using the import because I changed package.json to have a module type ("type": "module",)
import express from "express"

// To run this we need to change the type of the package.json to commonjs ("type: "commonjs",)
// const express = require("express");

const app = express();

// Routes
app.get("/api/notes", (req,res) => {
    res.status(200).send("you got 5 notes");
})

app.post("/api/notes", (req,res) => {
    res.status(201).json({message: "Note created successfully!"});
})
app.put("/api/notes/:id", (req,res) => {
    res.status(200).json({message: "Note updated successfully!"});
})
app.delete("/api/notes/:id", (req,res) => {
    res.status(200).json({message: "Note deleted successfully!"});
})

app.listen(5001, () => {
    console.log("Server started on PORT: 5001");
})
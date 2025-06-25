// I'm using the import because I changed package.json to have a module type ("type": "module",)
import express from "express"
import notesRoutes from "./routes/notesRoutes.js"

// To run this we need to change the type of the package.json to commonjs ("type: "commonjs",)
// const express = require("express");

const app = express();

app.use("/api/notes", notesRoutes);



app.listen(5001, () => {
    console.log("Server started on PORT: 5001");
})
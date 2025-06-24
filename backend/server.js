// I'm using the import because I changed package.json to have a module type ("type": "module",)
import express from "express"

// To run this we need to change the type of the package.json to commonjs ("type: "commonjs",)
// const express = require("express");

const app = express();

app.get("/api/notes", (req,res) => {
    res.status(200).send("you got 5 notes");
})

app.listen(5001, () => {
    console.log("Server started on PORT: 5001");
})
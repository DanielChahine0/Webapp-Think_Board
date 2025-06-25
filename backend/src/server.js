// I'm using the import because I changed package.json to have a module type ("type": "module",)
import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT= process.env.PORT;

connectDB();

// middleware
app.use(express.json())

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
})

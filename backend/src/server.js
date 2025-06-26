// I'm using the import because I changed package.json to have a module type ("type": "module",)
import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT= process.env.PORT;

connectDB();

// middleware
app.use(express.json()); // This middleware will parse JSON bosides: req.body
app.use(rateLimiter);
// custom middleware


app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
})

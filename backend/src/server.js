// I'm using the import because I changed package.json to have a module type ("type": "module",)
import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT= process.env.PORT;



// middlewares
app.use(express.json()); // middleware to parse JSON bosides: req.body
app.use(rateLimiter);    // ratelimiter middleware to help with over requesting
// my custom middleware
app.use((req,res,next)=>{
    console.log(`Request method is ${req.method} & Request URL is ${req.url}`);
    next();
});

app.use("/api/notes", notesRoutes);

// Make sure that the connection of the database is successfull before running the server 
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    });
});


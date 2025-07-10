// I'm using the import because I changed package.json to have a module type ("type": "module",)
import express from "express"
import session from "express-session";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import passport from "passport";
import "./config/auth.js"; // Import auth config to initialize passport strategies

dotenv.config();


function isLoggedIn(req, res, next) {
  if (req.user) {
    return next();
  }
  res.sendStatus(401); // Unauthorized'
}

/* ─── Constants ────────────────────────────────────────────────────────── */
const PORT= process.env.PORT;
const NODE_ENV = process.env.NODE_ENV ?? "development";
const ALLOWED_ORIGIN = process.env.CORS_ORIGIN ?? "http://localhost:5173";


const __dirname = path.resolve();


/* ─── App Setup ────────────────────────────────────────────────────────── */
const app = express();
app.use(session({ secret: process.env.SECRET})); // Session secret for signing the session ID cookie
app.use(passport.initialize());
app.use(passport.session()); // Persistent login sessions

/* ─── Passport.js Setup ────────────────────────────────────────────── */
app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});


app.get('/auth/google',
  passport.authenticate('google', {scope: ['email', 'profile']})
);

app.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
  })
);

app.get('/auth/failure', (req, res) =>{
  res.send('something went wrong..');
});

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (req, res) => {
  req.logout(function(err){
    if (err) { return res.status(500).send('Logout failed');}
  });
  req.session.destroy();
  res.send('You have been logged out');
});

/* Callback route for Google to redirect to after authentication */
app.use(helmet());
if (NODE_ENV !== "production"){app.use(cors({origin:ALLOWED_ORIGIN}));}
app.use(express.json()); // middleware to parse JSON bosides: req.body
app.use(rateLimiter);    // ratelimiter middleware to help with over requesting
app.use("/api/notes", notesRoutes);

if (NODE_ENV === "production"){
    const distPath = path.join(__dirname, "../frontend/dist");
    app.use(express.static(distPath));
    app.get("*", (req,res) => {
        res.sendFile(path.join(distPath, "index.html"))
    });
}


/* ─── DB & Server bootstrap ────────────────────────────────────────────── */
// Make sure that the connection of the database is successfull before running the server 
(async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () =>
      console.log(`🔗 Server running on http://localhost:${PORT}`)
    );

    /* Graceful shutdown */
    const shutdown = async (signal) => {
      console.log(`\n${signal} received — closing server…`);
      await server.close();
      process.exit(0);
    };
    process.on("SIGINT",  () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (err) {
    console.error("❌  Startup failed:", err);
    process.exit(1);
  }
})();

/* ──────────────────────────────────────────────────────────────────────── */
// I'm using the import because I changed package.json to have a module type ("type": "module",)
import express from "express";
import session from "express-session";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url"; // <-- Add this for __dirname in ES modules

import notesRoutes from "./routes/notesRoutes.js";
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
const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV ?? "development";
const ALLOWED_ORIGIN = process.env.CORS_ORIGIN ?? "http://localhost:5173";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ─── App Setup ────────────────────────────────────────────────────────── */
const app = express();

app.use(helmet());

if (NODE_ENV !== "production") {
  app.use(cors({
    origin: ALLOWED_ORIGIN,
    credentials: true,
  }));
}

app.use(express.json());

// Session and passport setup must come AFTER express.json and cors
app.use(session({
  secret: process.env.SECRET || "default_secret",
  resave: false,
  saveUninitialized: false,
  cookie: NODE_ENV === "production" ? { secure: true, sameSite: "lax" } : {},
}));
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
    successRedirect: `${ALLOWED_ORIGIN}/home`, // <-- redirect to frontend
    failureRedirect: '/auth/failure',
  })
);

app.get('/auth/failure', (req, res) =>{
  res.send('something went wrong..');
});

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (req, res, next) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(400).send('Not logged in');
  }
  req.logout(function(err){
    if (err) { return next(err); }
    req.session.destroy(function(err) {
      if (err) { return res.status(500).send('Logout failed'); }
      res.send('You have been logged out');
    });
  });
});

/* Callback route for Google to redirect to after authentication */

// Fix: Only apply rateLimiter to /api/notes, not globally
app.use("/api/notes", rateLimiter, notesRoutes);

if (NODE_ENV === "production"){
    const distPath = path.join(__dirname, "../frontend/dist");
    app.use(express.static(distPath));
    app.get("*", (req,res) => {
        res.sendFile(path.join(distPath, "index.html"));
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
      server.close(() => {
        process.exit(0);
      });
    };
    process.on("SIGINT",  () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (err) {
    console.error("❌  Startup failed:", err);
    process.exit(1);
  }
})();

/* ──────────────────────────────────────────────────────────────────────── */
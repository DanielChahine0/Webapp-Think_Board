# Think Board - Web Application
This project will use the MERN stack which contains
- **M - MongoDB:** A database that gives the app a place to store the data.
- **E - Express:** A web framework to build web apps easier and faster.
- **R - React:** A front end library.
- **N - NodeJS:** A Javascript Runtime package that lets us run JS on a server.

---
# Best Practices
## REST API
I created a REST API, which allows my 2 client and server to talk to each other. It uses different HTTP methods:
- GET → Get some information about a post
- POST → Create a post
- PUT → Update a post
- DELETE → Delete a post

## Separation of Files & Folders
First, there is a `source` folder that separate the code from the installed packages and the JSON files.
I created a separate folder for the `routes` and then linked them to the server using prefixing.
Even for the routes files, I have created a `controller` folder that contains all of the functions (separated by files) necessary for the routes.

## Secrecy 
Created a `.env` file that keeps tracks of our environment variable, this file will be hidden using the gitignore system. It will contain the port we're running the server on and the link for the database. 



--- 
# Files
## Environment Variables `.env`
- `MONGO_URI` is the connection string of the Mongoose Database
- `RATE_LIMIT_TOKENS` lets ops override the limit without code changes
- `RATE_LIMIT_WINDOW` lets ops override the limit windown without code changes
- `NODE_ENV` is the current type of runtime context we are in.
  -  **`"development"`** indicates that I am actively coding, debugging, and hot-reloading. In this context, the application should be ran through 2 terminals using `npm run dev` each time. Under the backend folder (preferably using *nodemon*) and under frontend folder.
  -  **`"production"`** indicates that I am serving real users. In this context, the application should be built using `npm run build` and then started using `npm run start`. Both commands should be executed under the main folder. 

## `db.js`
This file exposes a single async function, **`connectDB()`**, that opens a Mongoose connection using the connection string stored in the `MONGO_URI` environment variable.

## `upstash.js`
Creates and exports a ready-to-use **sliding-window** limiter that allows **50 requests per 30 s** by default.

## `notesController.js`
Small, self-contained controller module for a **Mongoose / Express** “Notes” API. It exposes the five classic CRUD operations: list, read, create, update, and delete.

| HTTP Verb | Route            | Controller            | Purpose                                   | Success code |
|-----------|------------------|-----------------------|-------------------------------------------|--------------|
| GET       | `/notes`         | `getAllNotes`         | Return **all notes**, newest first        | `200 OK`     |
| GET       | `/notes/:id`     | `getNoteById`         | Return one note by its **Mongo ObjectId** | `200 OK`     |
| POST      | `/notes`         | `createNote`          | Create a note from `{ title, content }`   | `201 Created`|
| PUT       | `/notes/:id`     | `updateNote`          | Replace title/content of an existing note | `200 OK`     |
| DELETE    | `/notes/:id`     | `deleteNote`          | Permanently remove a note                 | `200 OK`     |

All 3× unsuccessful look-ups (`:id` not found) respond with `404 Not Found`.  
Unexpected errors bubble up as `500 Internal Server Error` with a JSON body: `{ "message": "Internal server error" }`.

## `rateLimiter.js`
Express middleware that throttles incoming requests with Upstash Ratelimit.
- Consumes one token per hit (`"my-limit-key"` bucket).
- If the bucket is empty ⇒ responds 429 Too Many Requests.
- Otherwise passes control to the next handler.

## `Package JSON` 
1. Changed the type to module to be able to use proper imports `"type": "module"`
2. Installed nodemon to simulate a live server `"devDependencies": {"nodemon": "^3.1.10"}`
3. Added 2 script:
   1. First called dev to run the server.js using nodemod `"dev": "nodemon src/server.js"`
   2. Second Called start to run the server without listening to changes `"start": "node src/server.js"`

---
# To add later
## Change the rate limit to user
Because there is no authentication, if one of the users reaches the rate limit, all users will be restricted from making request.
What I actually need to do in the future is to implement some sort of user authentication, and then change the rate limit from `const {success} = await ratelimit.limit("my-rate-limit");` to `const {success} = await ratelimit.limit(userid);`. 
Maybe we can just change it to ip address instead of the user authentication.

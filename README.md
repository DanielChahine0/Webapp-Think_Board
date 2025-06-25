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
## Changes to my JSON Package
1. Changed the type to module to be able to use proper imports `"type": "module"`
2. Installed nodemon to simulate a live server `"devDependencies": {"nodemon": "^3.1.10"}`
3. Added 2 script:
   1. First called dev to run the server.js using nodemod `"dev": "nodemon src/server.js"`
   2. Second Called start to run the server without listening to changes `"start": "node src/server.js"`

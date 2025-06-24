# Think Board - Web Application
This project will use the MERN stack which contains
- **M - MongoDB:** A database that gives the app a place to store the data.
- **E - Express:** A web framework to build web apps easier and faster.
- **R - React:** A front end library.
- **N - NodeJS:** A Javascript Runtime package that lets us run JS on a server.

I created a REST API, which allows my 2 client and server to talk to each other. It uses different HTTP methods:
- GET → Get some information about a post
- POST → Create a post
- PUT → Update a post
- DELETE → Delete a post

--- 
## Changes to my JSON Package
1. Changed the type to module to be able to use proper imports `"type": "module"`
2. Installed nodemon to simulate a live server `"devDependencies": {"nodemon": "^3.1.10"}`
3. Added a script called dev to run the server.js using nodemod `"dev": "nodemon server.js"`
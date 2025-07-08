<!-- README.md – WEBAPP-THINK_BOARD -->
<h1 align="center">Think Board</h1>
<p align="center"><em>Unleash Creativity, Organize Ideas Instantly</em></p>

<p align="center">
  
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/DanielChahine0/Webapp-Think_Board?style=for-the-badge&logo=GitHub">

  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/DanielChahine0/Webapp-Think_Board?style=for-the-badge&logo=Javascript">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/DanielChahine0/Webapp-Think_Board?style=for-the-badge">

</p>

---

## Built with the tools and technologies

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript badge"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React badge"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express badge"/>
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose" alt="Mongoose badge"/>
  <img src="https://img.shields.io/badge/React&nbsp;Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router badge"/>
  <img src="https://img.shields.io/badge/Axios-671DDF?style=for-the-badge" alt="Axios badge"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite badge"/>
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="npm badge"/>
  <img src="https://img.shields.io/badge/.ENV-339933?style=for-the-badge" alt=".ENV badge"/>
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint badge"/>
  <img src="https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white" alt="Nodemon badge"/>
  <img src="https://img.shields.io/badge/PostCSS-dd3a0a?style=for-the-badge&logo=postcss&logoColor=white" alt="PostCSS badge"/>
  <img src="https://img.shields.io/badge/Autoprefixer-dd3735?style=for-the-badge&logo=postcss" alt="Autoprefixer badge"/>
  <img src="https://img.shields.io/badge/DaisyUI-14b8a6?style=for-the-badge&logo=daisyui&logoColor=white" alt="DaisyUI badge"/>
  <img src="https://img.shields.io/badge/JSON-5E5C5C?style=for-the-badge&logo=json" alt="JSON badge"/>
  <img src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown" alt="Markdown badge"/>
</p>

---

### 📚 Overview
Think Board is a full-stack web application that lets you capture notes, brainstorm ideas, and organize projects in one place.  
Whether you’re a developer jotting down code snippets or a student planning assignments, Think Board keeps everything tidy and searchable.

### 🚀 Quick Start

#### 1. Clone the repo
```bash
git clone https://github.com/<your-user>/WEBAPP-THINK_BOARD.git
cd WEBAPP-THINK_BOARD
```

#### 2. Install dependencies (client + server)
```bash
npm install              # root – installs server deps
cd frontend && npm i     # installs React/Vite deps
```

#### 3. Create an .env file
```
MONGO_URI = mongodbXXXXXXXXXXXXXXXXXXXXXX
PORT = XXXX
UPSTASH_REDIS_REST_URL = "https://XXXXXXX.upstash.io"
UPSTASH_REDIS_REST_TOKEN = "XXXXXXXXXXXXXXXXXXXXXXX"
NODE_ENV = development
RATE_LIMIT_TOKENS = 25
```

#### 4. Run in dev mode
```bash
npm run dev              # concurrently runs Vite + Express + Nodemon
```
### 📝 About
Think Board is a modern, full-stack “idea capture” workspace built with the MERN-plus stack (MongoDB + Express + React + Node, enhanced by Vite, DaisyUI, PostCSS and more). The project aims to give developers, students, and teams a friction-free canvas for:
- **Rapid note-taking & brainstorming** – create, edit, and delete notes in real time.
- **Project organisation** – group ideas, tasks, or research snippets in a single searchable hub.
- **Instant search & filtering** – powered by MongoDB text indexes for lightning-fast look-ups.
- **Responsive, accessible UI** – React + DaisyUI components compiled by Vite for <50 ms HMR.
- **Robust API** – Express routes secured with rate-limiting middleware and validated via Mongoose schemas.
- **Seamless navigation** – SPA routing handled by React Router; Axios manages client-server traffic.
- **Developer-friendly workflow** – Nodemon auto-reloads the server, ESLint enforces code quality, and environment variables (.env) keep secrets out of source control.

The badge block at the top of the `README` shows the repo’s last commit date, primary language, and language count, assuring newcomers the project is actively maintained. A second badge grid highlights every key tool so contributors can instantly see if the tech stack fits their skill set.

### Deployement
The app was deployed through Render.com and is active under [Think Board](https://webapp-think-board.onrender.com/)

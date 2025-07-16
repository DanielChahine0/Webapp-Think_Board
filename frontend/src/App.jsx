import { Route, Routes, Navigate, useLocation } from "react-router";
import { useState, useEffect } from "react";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import LoginPage from "./pages/LoginPage";
import { checkAuth } from "./lib/axios";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only check on /home, /create, /note/:id
    if (
      location.pathname === "/home" ||
      location.pathname === "/create" ||
      location.pathname.startsWith("/note/")
    ) {
      checkAuth().then(setAuthenticated);
    }
  }, [location.pathname]);

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 
      [background:radial-gradient(100%_150%_at_50%_5%,#000_50%,#270000_80%)]" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage setAuthenticated={setAuthenticated} />} />
        <Route
          path="/home"
          element={
            authenticated ? <HomePage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/create"
          element={
            authenticated ? <CreatePage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/note/:id"
          element={
            authenticated ? <NoteDetailPage /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </div>
  );
};

export default App;

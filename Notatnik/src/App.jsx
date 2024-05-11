import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Note from "./components/note";

function NotFound() {
  return (
    <div>
      <h1>Nie znaleziono strony</h1>
      <p>Przepraszamy, ale podany adres jest niepoprawny.</p>
      <a href="/">Przejdź do poprawnej strony</a>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Note />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
}

export default App;

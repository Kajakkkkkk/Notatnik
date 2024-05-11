import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Note from "./components/note";
import NotFound from "./components/notFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Note />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

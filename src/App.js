// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import RoutesConfig from "./routes/routes";

function App() {
  return (
    <Router>
      <RoutesConfig /> {/* Use RoutesConfig directly */}
    </Router>
  );
}

export default App;

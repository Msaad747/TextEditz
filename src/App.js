import "./App.css";
import Header from "./MyComponents/Header.js";
import Main from "./MyComponents/Main.js";
import React, { useState, useEffect, useMemo, useCallback, lazy } from "react";
import {  Route, Routes } from "react-router-dom";

// Lazy load components not needed on initial load
const About = lazy(() => import("./MyComponents/About.js"));

function App() {
  let title = "TextEditz";

  
  const [mode, setMode] = useState("dark");
  
  // Memoize style object
  const mystyle = useMemo(() => ({
    color: mode === "light" ? "#212529" : "#fff",
    backgroundColor: mode === "light" ? "#fff" : "#212529",
  }), [mode]);
  
  // Use useEffect to update body background (prevent re-render side effects)
  useEffect(() => {
    document.body.style.backgroundColor = mode === "dark" ? "#212529" : "white";
  }, [mode]);

  const tooglemode = useCallback(() => {
    setMode(mode === "light" ? "dark" : "light");
  }, [mode]);


  return (
    <>
      <Header
        title={title}
        mode={mode}
        style={mystyle}
        toogleMode={tooglemode}
      />
    <div className="container">

  <Routes>
  <Route path="/" element={<Main style={mystyle} Title={title} />} />
  <Route path="/about" element={<About style={mystyle} />} />
  </Routes>
  </div>

    </>
  );
}

export default App;

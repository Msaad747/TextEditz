import "./App.css";
import Header from "./MyComponents/Header.js";
import Main from "./MyComponents/Main.js";
import React, { useState, useEffect, useMemo, useCallback, Suspense, lazy } from "react";

// Lazy load components not needed on initial load
const About = lazy(() => import("./MyComponents/About.js"));
const PrivacyPolicy = lazy(() => import("./MyComponents/privacyPolicy.js"));
function App() {
  let title = "TextEditz";

  const [tabs, setTabs] = useState(false);
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
  const switchHome = useCallback(() => {
    setTabs(false);
  }, []);
  
  const switchAbout = useCallback(() => {
    setTabs(true);
  }, []);

  return (
    <>
      <Header
        title={title}
        mode={mode}
        style={mystyle}
        toogleMode={tooglemode}
        switchTab={switchAbout}
        switchhome={switchHome}
      />
    <div className="container">

     <div style={{ display: tabs ? "none" : "block" }}>
  <Main style={mystyle} Title={title} />
</div>

<Suspense fallback={<div style={{ padding: "20px", textAlign: "center", ...mystyle }}></div>}>
  <div style={{ display: tabs ? "block" : "none" }}>
    <About style={mystyle} />
  </div>
  <div style={{ display: tabs ? "block" : "none" }}>
    <PrivacyPolicy style={mystyle} />
  </div>
</Suspense>

    </div>

    </>
  );
}

export default App;

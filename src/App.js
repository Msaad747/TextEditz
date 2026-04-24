import "./App.css";
import Header from "./MyComponents/Header.js";
// import Footer from "./MyComponents/Footer.js";
import Main from "./MyComponents/Main.js";
import About from "./MyComponents/About.js";
import React, { useState } from "react";
function App() {
  let title = "TextEditz";

  const [tabs, setTabs] = useState(false);
  const [mode, setMode] = useState("light");
   const mystyle={
    color: mode === "light" ? "#212529" : "#fff",
    backgroundColor: mode === "light" ? "#fff" : "#212529",
  };
  if (mode === "dark") {
    document.body.style.backgroundColor = "#212529";
  } else {
    document.body.style.backgroundColor = "white";
  }

  const tooglemode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };
  const switchHome = () => {
    return setTabs(false);
  };
  const switchAbout = () => {
    return setTabs(true);
  };

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

      {!tabs && <Main style={mystyle}  Title={title}/>}
      {tabs && <About style={mystyle} />}
    </div>

    </>
  );
}

export default App;

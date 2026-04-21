import "./App.css";
import Header from "./MyComponents/Header.js";
// import Footer from "./MyComponents/Footer.js";
import Main from "./MyComponents/Main.js";

// import About from "./MyComponents/About.js";
import React, { useState } from "react";
function App() {
    const [mode, setMode] = useState("light");
    const [mystyle, setMyStyle] = useState({
      color: mode === "light" ? "dark" : "light" ,
      backgroundColor: mode === "light" ? "light" : "dark",});
  if(mode==="dark"){
    document.body.style.backgroundColor = "#212529";

  }
  else{
    document.body.style.backgroundColor = "white";
  }
    
  
  const tooglemode = () => {
    if (mode === "light") {
      setMode("dark");
      setMyStyle({
        color: "light",
        backgroundColor: "dark",
      });
      document.body.style.backgroundColor = "#212529";
    } else {
      setMode("light");
      setMyStyle({
        color: "dark",
        backgroundColor: "light",
      });
      document.body.style.backgroundColor = "white";
    }
  };

  return (
    <>
      <Header
        title="My App"
        mode={mode}
        style={mystyle}
        toogleMode={tooglemode}
      />
            <Main style={mystyle} />
   </>
  );
}

export default App;
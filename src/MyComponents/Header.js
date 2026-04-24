// import React, { useState } from "react";
export default function Header(props) {
  return (
    <nav
      className={`navbar navbar-expand-lg bg-body-tertiary   `}
      bg-color="dark"
      data-bs-theme={`${props.style.backgroundColor}`}
      style={{borderBottom:props.mode==="light"?"1px solid #212529":"1px solid white"}}
    >
      <div className="container-fluid">
      <a className="navbar-brand" onClick={props.switchhome} style={{ cursor: "pointer" }}>
       {props.title}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                onClick={props.switchhome}
                className="nav-link "
                
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button onClick={props.switchTab} className="nav-link" >
                About
              </button>
            </li>
          </ul>
          <div className="form-check form-switch" >
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="switchCheckChecked"
              onChange={props.toogleMode}
              checked={props.mode === "dark" ? true : false}
            
            />
            <label
              className={`form-check-label text-${props.style.color}`}
              htmlFor="switchCheckChecked"
            >
              {props.mode === "light"
                ? "Enable Dark Mode"
                : "Disable Dark Mode"}
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}

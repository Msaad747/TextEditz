// import React, { useState } from "react";
export default function Header(props) {

    return (
      <nav
        className={`navbar navbar-expand-lg bg-body-tertiary`}
        bg-color="dark"
        data-bs-theme={`${props.style.backgroundColor}`}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
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
                <a className="nav-link active"  href="/About.js">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  About
                </a>
              </li>
            </ul>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="switchCheckChecked"
                onClick={props.toogleMode}
                checked={props.mode === "dark" ? true : false}
                
              />
              <label className={`form-check-label text-${props.style.color}`} htmlFor="switchCheckChecked">
                {props.mode === "light" ? "Enable Dark Mode" : "Disable Dark Mode"}
              </label>
            </div>
          </div>
        </div>
      </nav>
    );
  };


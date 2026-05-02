import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
export default function About(props) {
  const isDark = props.style.backgroundColor === "#212529";
  return (
    <>
      <div className="container" style={{ fontFamily: "Times New Roman" }}>
        <h2
          className={`my-1 mx-3 ${isDark ? "bg-dark text-light" : "bg-light text-dark"}`}
        >
          <button
          className={`btn ${isDark ? "btn-outline-light" : "btn-outline-dark"} fs-4`}
          style={{cursor:"default"}}
        >
         ❓ About Us
        </button>
        </h2>
        <div className={`container my-1 accordion  `} id="accordionExample">
          <div
            className={`accordion-item ${isDark ? "bg-dark text-light" : "bg-light text-dark"} `}
          >
            <h2 className={`accordion-header `}>
              <button
                className={`accordion-button collapsed ${isDark ? "bg-dark text-light dark-arrow" : "bg-light text-dark"} `}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                📞Contact Us
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse  "
              
            >
              <div className="accordion-body">
                <strong>{`[ +92 330-6961412 ]`}</strong>
                <br />
              </div>
            </div>
          </div>
          <div
            className={`accordion-item ${isDark ? "bg-dark text-light" : "bg-light text-dark"}`}
          >
            <h2 className="accordion-header">
              <button
                className={`accordion-button collapsed m-0 ${isDark ? "bg-dark text-light dark-arrow" : "bg-light text-dark"}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                📩Email
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              
            >
              <div className="accordion-body">
                <strong>{`[ saadhunter007@gmail.com ]`}</strong> <br />
              </div>
            </div>
          </div>
          <div
            className={`accordion-item ${isDark ? "bg-dark text-light" : "bg-light text-dark"}`}
          >
            <h2 className="accordion-header">
              <button
                className={`accordion-button collapsed  m-0 ${isDark ? "bg-dark text-light dark-arrow" : "bg-light text-dark"}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                <i className="bi bi-linkedin">{` LinkedIn`}</i>
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              
            >
              <div className="accordion-body">
                <strong>{`[ Didn't have any ]`}</strong> <br />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className={`${isDark?"bg-dark text-light":"bg-light text-dark"} border-2 opacity-25`} />
    </>
  );
}

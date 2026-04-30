import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
export default function About(props) {
  const isDark = props.style.backgroundColor === "#212529" 
  return (
    <>
      <div className="container" style={{ fontFamily: "Times New Roman" }}>
        <h2
          className={`my-1 mx-3 ${isDark ? "bg-dark text-light" : "bg-light text-dark"}`}
        >
          About Us
        </h2>
        <div className={`container my-1 accordion  `} id="accordionExample">
          <div
            className={`accordion-item ${isDark ? "bg-dark text-light" : "bg-light text-dark"} `}
          >
            <h2 className={`accordion-header `}>
              <button
                className={`accordion-button ${isDark ? "bg-dark text-light dark-arrow" : "bg-light text-dark"} `}
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
              className="accordion-collapse collapse show "
              data-bs-parent="#accordionExample"
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
                className={`accordion-button collapsed  ${isDark ? "bg-dark text-light dark-arrow" : "bg-light text-dark"}`}
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
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>{`[ saadhunter0072gmail.com ]`}</strong> <br />
                
              </div>
            </div>
          </div>
          <div
            className={`accordion-item ${isDark ? "bg-dark text-light" : "bg-light text-dark"}`}
          >
            <h2 className="accordion-header">
              <button
                className={`accordion-button collapsed  ${isDark ? "bg-dark text-light dark-arrow" : "bg-light text-dark"}`}
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
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>{`[ Didn't have any ]`}</strong> <br />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

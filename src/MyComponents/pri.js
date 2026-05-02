import React from "react";

export default function PrivacyPolicy(props) {
  const isDark = props.style.backgroundColor === "#212529";

  return (
    <div
      className={`container   mx-3 ${isDark ? "text-light" : "text-dark"}`}
      style={{ fontFamily: "Times New Roman" }}
    >
      <div className="text-left mt-1 mb-2">
        <button
          className={`btn ${isDark ? "btn-outline-light" : "btn-outline-dark"} fs-4 mb-3 `}
          style={{cursor:"default"}}
        >
          🔒 Privacy Policy
        </button>
      </div>

      
      <ul style={{cursor:"default"}}>
        <li>
          <p>
            This website uses cookies to improve user experience and display
            ads.
          </p>
        </li>
        <li>
          <p>
            We may use third-party services like Google AdSense which use
            cookies to show personalized advertisements.
          </p>
        </li>
        <li>
          <p>
            By using this site, you consent to the use of cookies and data
            collection.
          </p>
        </li>
        <li>
          <p>
            If you have any questions, contact us at: saadhunter007@gmail.com
          </p>
        </li>
      </ul>
    </div>
  );
}

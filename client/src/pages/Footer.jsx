import React from "react";
import "../styles/pages/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>ConvertX</h2>
          <p>Fast & reliable document conversion tools.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/tools">Tools</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <ul>
            <li>Email: support@convertx.com</li>
            <li>GitHub: github.com/username</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} ConvertX — All Rights Reserved.
      </div>
    </footer>
  );
}

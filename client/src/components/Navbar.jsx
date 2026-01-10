import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/components/Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">ConvertX</div>

      {/* Hamburger icon for mobile */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className={menuOpen ? "bar bar1 rotate1" : "bar bar1"}></div>
        <div className={menuOpen ? "bar bar2 fade" : "bar bar2"}></div>
        <div className={menuOpen ? "bar bar3 rotate2" : "bar bar3"}></div>
      </div>

      {/* Navigation Links */}
      <ul className={menuOpen ? "nav-links mobile-open" : "nav-links"}>
        <li onClick={() => setMenuOpen(false)}>
          <Link to="/">Home</Link>
        </li>

        <li onClick={() => setMenuOpen(false)}>
          <Link to="/tools">Tools</Link>
        </li>

        <li onClick={() => setMenuOpen(false)}>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}

import React, { useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  return (
    <div className="header-container">
      <div className="logo">
        <h3 className="logo-food">FOOD</h3>
        <h1 className="logo-foria">FORIA</h1>
      </div>

      <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reviews"
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Reviews
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={() => setMenuOpen(false)}
            >
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="btns">
        <button className="btn login">Log In</button>
        <button className="btn signup">Sign Up</button>
      </div>
      {/* Hamburger icon for mobile */}
      <div className="hamburger" onClick={toggleMobileMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </div>
  );
}

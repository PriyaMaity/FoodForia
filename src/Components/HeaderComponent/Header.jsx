import React, { useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="header-container">
      <div className="logo">
        <h3 className="logo-food">FOOD</h3>
        <h1 className="logo-foria">FORIA</h1>
      </div>

      <nav>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reviews"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Reviews
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? "active-link" : "")}
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
    </div>
  );
}

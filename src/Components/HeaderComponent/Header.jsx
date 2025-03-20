import React, { useState, useEffect } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { auth } from "../../Config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Auth from "../AuthComponent/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Current User:", currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleMobileMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const getInitials = (user) => {
    if (user?.displayName) {
      const names = user.displayName.split(" ");
      return names.map((n) => n.charAt(0).toUpperCase()).join("");
    } else if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "";
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

      {user ? (
        <div className="profile-section">
          <div className="initials-avatar">{getInitials(user)}</div>
          <button onClick={handleSignOut} className="btn signout">
            Log Out
          </button>
        </div>
      ) : (
        <div className="btns">
          <button className="btn login" onClick={() => openAuthModal("login")}>
            Log In
          </button>
          <button
            className="btn signup"
            onClick={() => openAuthModal("signup")}
          >
            Sign Up
          </button>
        </div>
      )}

      {/* Hamburger icon for mobile */}
      <div className="hamburger" onClick={toggleMobileMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {authModalOpen && <Auth mode={authMode} onClose={closeAuthModal} />}
    </div>
  );
}

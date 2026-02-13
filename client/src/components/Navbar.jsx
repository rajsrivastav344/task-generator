// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Internal styles
  const navStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "12px 24px",
    background: "linear-gradient(135deg, #7b4acf, #4a2cc1)",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    marginBottom: "20px",
    flexWrap: "wrap"
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500",
    padding: "6px 12px",
    borderRadius: "6px",
    transition: "all 0.3s ease",
  };

  const linkHover = (e) => {
    e.currentTarget.style.background = "rgba(255,255,255,0.2)";
  };

  const linkOut = (e) => {
    e.currentTarget.style.background = "transparent";
  };

  const logoutButtonStyle = {
    padding: "6px 14px",
    borderRadius: "6px",
    border: "none",
    background: "#ff5252",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease",
  };

  const logoutHover = (e) => {
    e.currentTarget.style.background = "#e04848";
    e.currentTarget.style.transform = "scale(1.05)";
  };

  const logoutOut = (e) => {
    e.currentTarget.style.background = "#ff5252";
    e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <nav style={navStyle}>
      <Link
        to="/"
        style={linkStyle}
        onMouseOver={linkHover}
        onMouseOut={linkOut}
      >
        Home
      </Link>
      <Link
        to="/analytics"
        style={linkStyle}
        onMouseOver={linkHover}
        onMouseOut={linkOut}
      >
        Analytics
      </Link>
      <Link
        to="/admin"
        style={linkStyle}
        onMouseOver={linkHover}
        onMouseOut={linkOut}
      >
        Admin
      </Link>
      {!isLoggedIn && (
        <>
          <Link
            to="/login"
            style={linkStyle}
            onMouseOver={linkHover}
            onMouseOut={linkOut}
          >
            Login
          </Link>
          <Link
            to="/register"
            style={linkStyle}
            onMouseOver={linkHover}
            onMouseOut={linkOut}
          >
            Register
          </Link>
        </>
      )}
      {isLoggedIn && (
        <button
          style={logoutButtonStyle}
          onClick={handleLogout}
          onMouseOver={logoutHover}
          onMouseOut={logoutOut}
        >
          Logout
        </button>
      )}
    </nav>
  );
}

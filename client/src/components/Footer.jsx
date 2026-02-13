// src/components/Footer.jsx
import React from "react";
import { FaInstagram, FaTelegramPlane, FaLinkedin } from "react-icons/fa"; // react-icons

export default function Footer() {
  const footerStyle = {
    background: "linear-gradient(135deg, #7b4acf, #4a2cc1)",
    color: "#fff",
    padding: "30px 20px",
    textAlign: "center",
    borderRadius: "12px",
    marginTop: "40px",
    boxShadow: "0 -4px 20px rgba(0,0,0,0.15)"
  };

  const linkStyle = {
    color: "#fff",
    margin: "0 8px",
    textDecoration: "none",
    fontWeight: "500",
    transition: "all 0.3s ease"
  };

  const linkHover = (e) => {
    e.currentTarget.style.color = "#ffdd57";
    e.currentTarget.style.textDecoration = "underline";
  };

  const linkOut = (e) => {
    e.currentTarget.style.color = "#fff";
    e.currentTarget.style.textDecoration = "none";
  };

  const socialStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "15px",
    fontSize: "1.6rem"
  };

  return (
    <footer style={footerStyle}>
      <p>© 2026 Task Generator App | Made with ❤️</p>
      <p>
        <a href="#about" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>About</a> | 
        <a href="#services" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>Services</a> | 
        <a href="#privacy" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>Privacy</a> | 
        <a href="#terms" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>Terms</a>
      </p>
      <div style={socialStyle}>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>
          <FaInstagram />
        </a>
        <a href="https://t.me" target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>
          <FaTelegramPlane />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseOver={linkHover} onMouseOut={linkOut}>
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
}

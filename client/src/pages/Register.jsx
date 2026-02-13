import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://task-generator-1-7t1y.onrender.com/api/auth";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/register`, form);
      alert("Registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  // --- Inline Styles ---
  const containerStyle = {
    width: "350px",
    margin: "80px auto",
    padding: "30px",
    borderRadius: "12px",
    background: "#ffffffee",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    overflow: "hidden",
    position: "relative",
    transform: "translateY(-50px)",
    opacity: 0,
    animation: "slideDown 0.7s forwards",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "25px",
    color: "#4a6cf7",
    opacity: 0,
    animation: "fadeInText 0.6s forwards",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    backgroundColor: "#f0f4f8",
    color: "#333",
    opacity: 0,
    transform: "translateY(20px)",
    animation: "fadeUp 0.5s forwards",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px 0",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    background: "linear-gradient(135deg, #4a6cf7, #7b4acf)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    opacity: 0,
    transform: "scale(0.8)",
    animation: "fadeScale 0.5s forwards",
    animationDelay: "0.6s",
  };

  const buttonHover = (e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.background = "linear-gradient(135deg, #7b4acf, #4a6cf7)";
    e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.2)";
  };

  const buttonOut = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.background = "linear-gradient(135deg, #4a6cf7, #7b4acf)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Register</h2>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <input
          style={{ ...inputStyle, animationDelay: "0.3s" }}
          placeholder="Name"
          required
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          style={{ ...inputStyle, animationDelay: "0.4s" }}
          placeholder="Email"
          type="email"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          style={{ ...inputStyle, animationDelay: "0.5s" }}
          placeholder="Password"
          type="password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Role Selector */}
        <select
          style={{ ...inputStyle, animationDelay: "0.6s" }}
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={buttonHover}
          onMouseOut={buttonOut}
        >
          Register
        </button>
      </form>

      {/* Internal keyframe animations */}
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeInText {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeScale {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

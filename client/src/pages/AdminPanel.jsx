// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://task-generator-1-7t1y.onrender.com//api/specs";

export default function AdminPanel() {
  const [specs, setSpecs] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || role !== "admin") {
      alert("Unauthorized! Please login as admin.");
      navigate("/login");
      return;
    }

    const fetchSpecs = async () => {
      try {
        // Make sure token is sent in correct format
        const res = await axios.get(`${API}/admin/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSpecs(res.data);
      } catch (err) {
        console.error(err.response || err);
        alert(
          "Failed to fetch specs. Check your token or login again."
        );
        localStorage.clear(); // force re-login
        navigate("/login");
      }
    };

    fetchSpecs();
  }, [token, role, navigate]);

  const deleteSpec = async (id) => {
    if (!window.confirm("Are you sure you want to delete this spec?")) return;

    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSpecs(specs.filter((s) => s._id !== id));
      alert("Spec deleted successfully!");
    } catch (err) {
      console.error(err.response || err);
      alert("Failed to delete spec. You might not have permission.");
    }
  };

  // --- Inline CSS ---
  const containerStyle = {
    width: "80%",
    margin: "20px auto",
    animation: "fadeSlide 0.7s ease forwards",
  };

  const cardStyle = {
    background: "linear-gradient(135deg, #7b4acf, #4a2cc1)",
    color: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "15px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const cardHover = (e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.25)";
  };

  const cardOut = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.15)";
  };

  const buttonStyle = {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    background: "#ff5252",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    marginTop: "10px",
  };

  const buttonHover = (e) => {
    e.currentTarget.style.background = "#e04848";
    e.currentTarget.style.transform = "scale(1.05)";
  };

  const buttonOut = (e) => {
    e.currentTarget.style.background = "#ff5252";
    e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <div style={containerStyle}>
      <h2
        style={{
          color: "#4a6cf7",
          marginBottom: "25px",
          textAlign: "center",
        }}
      >
        Admin Panel
      </h2>

      {specs.length === 0 && <p>No specs available.</p>}

      {specs.map((spec) => (
        <div
          key={spec._id}
          style={cardStyle}
          onMouseOver={cardHover}
          onMouseOut={cardOut}
        >
          <h4>{spec.goal}</h4>
          <p>
            <strong>Template:</strong> {spec.template}
          </p>
          <p>
            <strong>Tasks:</strong> {spec.tasks ? spec.tasks.length : 0}
          </p>
          <button
            style={buttonStyle}
            onClick={() => deleteSpec(spec._id)}
            onMouseOver={buttonHover}
            onMouseOut={buttonOut}
          >
            Delete
          </button>
        </div>
      ))}

      <style>{`
        @keyframes fadeSlide {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

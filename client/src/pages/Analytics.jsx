// src/pages/Analytics.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/specs";

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const API_KEY = "supersecretapikey123"; // optional for API-key route

  useEffect(() => {
    axios
      .get(`${API}/analytics/summary`, { headers: { "x-api-key": API_KEY } })
      .then((res) => setStats(res.data))
      .catch(() => alert("Failed to fetch analytics"));
  }, []);

  if (!stats)
    return (
      <p style={{ textAlign: "center", fontSize: "1.2rem", marginTop: "50px" }}>
        Loading...
      </p>
    );

  // Inline CSS
  const containerStyle = {
    width: "80%",
    margin: "20px auto",
    textAlign: "center",
  };

  const cardStyle = {
    background: "linear-gradient(135deg, #7b4acf, #4a2cc1)",
    color: "#fff",
    padding: "25px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const cardHover = (e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
  };

  const cardOut = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.2)";
  };

  const statStyle = {
    fontSize: "1.2rem",
    margin: "10px 0",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: "#4a6cf7", marginBottom: "25px" }}>Analytics</h2>
      <div
        style={cardStyle}
        onMouseOver={cardHover}
        onMouseOut={cardOut}
      >
        <p style={statStyle}>Total Specs: {stats.totalSpecs}</p>
        <p style={statStyle}>Total Tasks: {stats.totalTasks}</p>
        <p style={statStyle}>Average Tasks per Spec: {stats.avgTasks}</p>
      </div>
    </div>
  );
}

// src/components/RecentSpecs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://task-generator-1-7t1y.onrender.com/api/specs";

export default function RecentSpecs() {
  const [specs, setSpecs] = useState([]);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    axios
      .get(`${API}/recent`)
      .then((res) => setSpecs(res.data))
      .catch(() => alert("Failed to fetch specs."));
  }, []);

  const handleViewTasks = (tasks) => {
    if (!tasks || tasks.length === 0) return alert("No tasks available");
    const list = tasks
      .map((t, idx) => `${idx + 1}. ${t.title}: ${t.description}`)
      .join("\n");
    alert(list);
  };

  const handleDelete = async (id) => {
    if (!token) return alert("Unauthorized");
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSpecs(specs.filter((s) => s._id !== id));
      alert("Spec deleted successfully!");
    } catch {
      alert("Failed to delete. You might not have permission.");
    }
  };

  // --- Styles ---
  const containerStyle = {
    marginTop: "30px",
    padding: "20px",
    background: "#ffffffee",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    animation: "fadeSlide 0.7s ease forwards",
  };

  const cardStyle = {
    padding: "12px 15px",
    marginBottom: "10px",
    borderRadius: "10px",
    background: "#f4f1ff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const buttonStyle = {
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    marginLeft: "6px",
  };

  return (
    <div style={containerStyle}>
      <h3 style={{ textAlign: "center", color: "#7b4acf" }}>Recent Specs</h3>
      {specs.map((s) => (
        <div key={s._id} style={cardStyle}>
          <div>
            <strong>{s.goal}</strong> ({s.template})
          </div>
          <div>
            <button
              style={{ ...buttonStyle, background: "#4a6cf7", color: "#fff" }}
              onClick={() => handleViewTasks(s.tasks)}
            >
              View Tasks
            </button>

            {role === "admin" && (
              <button
                style={{ ...buttonStyle, background: "#ff5252", color: "#fff" }}
                onClick={() => handleDelete(s._id)}
              >
                Delete
              </button>
            )}
          </div>
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

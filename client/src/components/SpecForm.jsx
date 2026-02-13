// src/components/SpecForm.jsx
import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/specs";

export default function SpecForm({ setTasks, setSpecId }) {
  const [form, setForm] = useState({
    goal: "",
    users: "",
    constraints: "",
    template: "web",
    risks: ""
  });

  const generateTasks = () => [
    { title: "Define Requirements", description: `Clarify goal: ${form.goal}`, group: "Planning", order: 1 },
    { title: "Design UI", description: "Create wireframes", group: "Design", order: 2 },
    { title: "Backend Setup", description: "Create APIs & DB schema", group: "Backend", order: 3 },
    { title: "Frontend Development", description: "Build UI components", group: "Frontend", order: 4 }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tasks = generateTasks();
    const res = await axios.post(API, { ...form, tasks });
    setTasks(res.data.tasks);
    setSpecId(res.data._id);
  };

  // Internal styles
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    background: "#ffffffee",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    animation: "slideDown 0.7s ease-out forwards"
  };

  const inputStyle = {
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
    backgroundColor: "#f0f4f8",
    color: "#333",
    transition: "all 0.3s ease",
  };

  const inputFocus = {
    borderColor: "#7b4acf",
    boxShadow: "0 0 8px rgba(123,76,207,0.4)",
    backgroundColor: "#fff",
    outline: "none"
  };

  const buttonStyle = {
    padding: "12px 0",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    background: "linear-gradient(135deg, #7b4acf, #4a2cc1)",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const buttonHover = {
    background: "linear-gradient(135deg, #4a2cc1, #7b4acf)",
    transform: "scale(1.05)"
  };

  return (
    <form
      style={formStyle}
      onSubmit={handleSubmit}
    >
      <input
        placeholder="Goal"
        value={form.goal}
        onChange={e => setForm({ ...form, goal: e.target.value })}
        style={inputStyle}
        onFocus={e => Object.assign(e.target.style, inputFocus)}
        onBlur={e => Object.assign(e.target.style, inputStyle)}
      />
      <textarea
        placeholder="Users"
        value={form.users}
        onChange={e => setForm({ ...form, users: e.target.value })}
        style={inputStyle}
        onFocus={e => Object.assign(e.target.style, inputFocus)}
        onBlur={e => Object.assign(e.target.style, inputStyle)}
      />
      <textarea
        placeholder="Constraints"
        value={form.constraints}
        onChange={e => setForm({ ...form, constraints: e.target.value })}
        style={inputStyle}
        onFocus={e => Object.assign(e.target.style, inputFocus)}
        onBlur={e => Object.assign(e.target.style, inputStyle)}
      />
      <select
        value={form.template}
        onChange={e => setForm({ ...form, template: e.target.value })}
        style={inputStyle}
        onFocus={e => Object.assign(e.target.style, inputFocus)}
        onBlur={e => Object.assign(e.target.style, inputStyle)}
      >
        <option value="web">Web</option>
        <option value="mobile">Mobile</option>
        <option value="internal">Internal</option>
      </select>
      <textarea
        placeholder="Risks"
        value={form.risks}
        onChange={e => setForm({ ...form, risks: e.target.value })}
        style={inputStyle}
        onFocus={e => Object.assign(e.target.style, inputFocus)}
        onBlur={e => Object.assign(e.target.style, inputStyle)}
      />
      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={e => Object.assign(e.target.style, buttonHover)}
        onMouseOut={e => Object.assign(e.target.style, buttonStyle)}
      >
        Generate
      </button>
    </form>
  );
}

import React from "react";

export default function ExportButton({ tasks }) {
  const handleExport = () => {
    if (!tasks || tasks.length === 0) {
      alert("No tasks to export!");
      return;
    }

    // Convert tasks to Markdown format
    const markdown = tasks
      .map(
        (t) =>
          `- **${t.title}** (${t.group})\n  - ${t.description}`
      )
      .join("\n");

    // Write to clipboard
    navigator.clipboard
      .writeText(markdown)
      .then(() => alert("Tasks copied to clipboard!"))
      .catch(() => alert("Failed to copy tasks."));
  };

  // --- Inline styles ---
  const buttonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #7b4acf, #4a6cf7)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
  };

  const hoverStyle = {
    transform: "scale(1.05)",
    boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
  };

  const [hover, setHover] = React.useState(false);

  return (
    <button
      style={{ ...buttonStyle, ...(hover ? hoverStyle : {}) }}
      onClick={handleExport}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Export Tasks
    </button>
  );
}

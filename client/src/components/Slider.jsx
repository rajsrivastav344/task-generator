// src/components/Slider.jsx
import React, { useState, useEffect } from "react";

const slides = [
  { text: "Generate Tasks Instantly", bg: "linear-gradient(135deg, #7b4acf, #4a2cc1)" },
  { text: "Organize Your Features", bg: "linear-gradient(135deg, #4a2cc1, #7b4acf)" },
  { text: "Track Analytics Easily", bg: "linear-gradient(135deg, #8e44ad, #9b59b6)" },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false); // start fade out
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % slides.length);
        setFade(true); // fade in new slide
      }, 500); // fade duration
    }, 5000); // 5 seconds per slide
    return () => clearInterval(timer);
  }, []);

  // Internal styles
  const sliderStyle = {
    width: "100%",
    height: "220px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    marginBottom: "20px",
    background: slides[current].bg,
    color: "#fff",
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    transition: "background 1s ease",
    position: "relative",
    overflow: "hidden",
  };

  const textStyle = {
    opacity: fade ? 1 : 0,
    transition: "opacity 0.5s ease, transform 0.5s ease",
    transform: fade ? "translateY(0)" : "translateY(20px)",
  };

  return (
    <div style={sliderStyle}>
      <h1 style={textStyle}>{slides[current].text}</h1>
    </div>
  );
}

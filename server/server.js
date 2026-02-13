// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ================== MIDDLEWARE ==================
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// ================== ROUTES ==================
app.use("/api/specs", require("./routes/specRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

// ================== HEALTH CHECK ==================
app.get("/", (req, res) => {
  res.send("✅ API is running");
});

// ================== HANDLE UNKNOWN ROUTES ==================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ================== DATABASE ==================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ================== SERVER ==================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

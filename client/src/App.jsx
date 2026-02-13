import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Slider from "./components/Slider.jsx";
import Footer from "./components/Footer.jsx";

import SpecForm from "./components/SpecForm.jsx";
import TaskBoard from "./components/TaskBoard.jsx";
import RecentSpecs from "./components/RecentSpecs.jsx";
import Analytics from "./pages/Analytics.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [specId, setSpecId] = useState(null);

  return (
    <div className="container">
      <Slider />
      <SpecForm setTasks={setTasks} setSpecId={setSpecId} />
      <TaskBoard tasks={tasks} setTasks={setTasks} specId={specId} />
      <RecentSpecs />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

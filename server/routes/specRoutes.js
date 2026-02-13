const express = require("express");
const router = express.Router();
const Spec = require("../models/Spec");
const { authMiddleware } = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// ================== CREATE SPEC ==================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const spec = await Spec.create(req.body);
    res.json(spec);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================== GET LAST 5 SPECS ==================
router.get("/recent", async (req, res) => {
  try {
    const specs = await Spec.find().sort({ createdAt: -1 }).limit(5);
    res.json(specs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================== UPDATE SPEC ==================
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const updated = await Spec.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Spec not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================== DELETE SPEC ==================
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deleted = await Spec.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Spec not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================== ADMIN: GET ALL SPECS ==================
router.get("/admin/all", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const specs = await Spec.find().sort({ createdAt: -1 });
    res.json(specs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ================== ANALYTICS ==================
router.get("/analytics/summary", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const totalSpecs = await Spec.countDocuments();
    const specs = await Spec.find();
    const totalTasks = specs.reduce((sum, s) => sum + (s.tasks?.length || 0), 0);

    const templateStats = await Spec.aggregate([
      { $group: { _id: "$template", count: { $sum: 1 } } },
    ]);

    const dailyStats = await Spec.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      totalSpecs,
      totalTasks,
      templateStats,
      dailyStats,
      avgTasks: totalSpecs === 0 ? 0 : totalTasks / totalSpecs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  group: String,
  order: Number
});

const specSchema = new mongoose.Schema({
  goal: String,
  users: String,
  constraints: String,
  template: String,
  risks: String,
  tasks: [taskSchema],
  ipAddress: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Spec", specSchema);

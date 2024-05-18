const mongoose = require("../configuration/dbConfig");

const taskSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  title: { type: String, unique: true },
  description: String,
  dueDate: { type: Date, default: Date.now() },
  priorityLevel: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
  category: {
    type: String,
    enum: ["Personal", "Work", "Errands"],
    default: "Personal",
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Task", taskSchema);

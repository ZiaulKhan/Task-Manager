const express = require("express");
const router = express.Router();
const {
  getTasks,
  getTask,
  getTasksByPriority,
  postTask,
  putTask,
  deleteTask,
} = require("../controllers/taskControllers");

// Routes beginning with /api/tasks
router.get("/getAllTasks", getTasks);
router.get("/getTasksByPriority/:priority", getTasksByPriority);
router.get("/getTask/:taskId", getTask);
router.post("/addTask", postTask);
router.put("/updateTask/:taskId", putTask);
router.delete("/deleteTask/:taskId", deleteTask);

module.exports = router;

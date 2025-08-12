const express = require("express");
const authenticate = require("../middlewares/auth-middleware");
const taskController = require("../controllers/task.controller");
const router = express.Router();

router.use(authenticate);

router.get("/list", taskController.getTaskList);
router.get("/detail/:taskId", taskController.getTask);
router.get("/today-tasks", taskController.getTodayTasks);
router.post("/add", taskController.addTask);
router.post("/update/:taskId", taskController.updateTask);
router.delete("/delete/:taskId", taskController.deleteTask);
router.post("/update-status/:taskId", taskController.updateTaskStatus);

module.exports = router;

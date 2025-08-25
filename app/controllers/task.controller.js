const taskService = require("../services/task.service");

async function getTaskList(req, res) {
  try {
    const user = req.user;
    const { status } = req.params;
    const list = await taskService.taskList(user.userId, { status: status });
    return res.status(200).json({
      status: 200,
      success: true,
      message: "successfull...",
      data: list || [],
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: JSON.stringify(error),
    });
  }
}

async function getTask(req, res) {
  try {
    const taskId = req.params.taskId;
    const user = req.user;
    const task = await taskService.getTask(user.userId, taskId);
    return res.status(200).json({
      success: true,
      status: 200,
      data: task,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: JSON.stringify(error),
    });
  }
}

async function getTodayTasks(req, res) {
  try {
    const user = req.user;
    const tasks = await taskService.getTodayTasks(user.userId);
    return res.status(200).json({
      success: true,
      status: 200,
      data: tasks,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: JSON.stringify(error),
    });
  }
}

async function addTask(req, res) {
  try {
    const user = req.user;
    const { title, description, dateTime } = req.body;
    const addedData = await taskService.addTask(
      title,
      description,
      dateTime,
      user.userId
    );
    return res.status(200).json({
      status: 200,
      success: true,
      data: addedData || [],
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: JSON.stringify(error),
    });
  }
}

async function updateTask(req, res) {
  try {
    const { title, description, dateTime, completed } = req.body;
    const taskId = req.params.taskId;
    const task = await taskService.updateTask(
      taskId,
      title,
      description,
      dateTime,
      completed
    );
    return res.status(200).json({
      success: true,
      status: 200,
      data: task,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: JSON.stringify(error),
    });
  }
}

async function deleteTask(req, res) {
  try {
    const taskId = req.params.taskId;
    const deleteTask = taskService.deleteTask(taskId);
    return res.status(200).json({
      status: 200,
      success: true,
      message: "task successfully deleted.",
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: JSON.stringify(error),
    });
  }
}

async function updateTaskStatus(req, res) {
  try {
    const { status } = req.body;
    const taskId = req.params.taskId;
    const updated = taskService.updateTaskStatus(taskId, status);
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Status updated...",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: JSON.stringify(error),
    });
  }
}

module.exports = {
  getTaskList,
  addTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  getTask,
  getTodayTasks,
};

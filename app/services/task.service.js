const { Op } = require("sequelize");
const { Tasks } = require("../models");

async function taskList(userId, params) {
  try {
    const whereClause = { userId: userId };
    if (params.status != undefined) {
      whereClause.completed = params.status;
    }
    const taskList = await Tasks.findAll({ where: whereClause });
    return taskList;
  } catch (error) {
    throw new Error(error);
  }
}

async function getTask(userId, taskId) {
  try {
    const task = await Tasks.findOne({ where: { taskId, userId } });
    return task;
  } catch (error) {
    throw new Error(error);
  }
}

async function getTodayTasks(userId) {
  const startOfToday = new Date().setHours(0, 0, 0, 0);
  const endOfToday = new Date().setHours(23, 59, 59, 999);
  try {
    const tasks = await Tasks.findAll({
      where: {
        userId: userId,
        dateTime: {
          [Op.between]: [startOfToday, endOfToday],
        },
      },
    });
    return tasks;
  } catch (error) {
    throw new Error(error);
  }
}

async function addTask(title, description, dateTime, userId) {
  try {
    const added = await Tasks.create({ title, description, dateTime, userId });
    return added;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateTask(taskId, title, description, dateTime, completed) {
  try {
    const task = await Tasks.findByPk(taskId);
    const updatedTask = await task.update({
      title,
      description,
      dateTime,
      completed: completed || false,
    });
    return updatedTask;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteTask(taskId) {
  try {
    const task = await Tasks.findByPk(taskId);
    const deleteTask = await task.destroy();
    return true;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateTaskStatus(taskId, status) {
  try {
    const task = await Tasks.findByPk(taskId);
    const updated = await task.update({ completed: status });
    return true;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  taskList,
  addTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  getTask,
  getTodayTasks,
};

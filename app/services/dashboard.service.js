const { Op } = require("sequelize");
const { Tasks } = require("../models");

async function getDashboardData(userId) {
  const startOfToday = new Date().setHours(0, 0, 0, 0);
  const endOfToday = new Date().setHours(23, 59, 59, 999);
  try {
    const totalTaskCount = await Tasks.count({
      where: {
        userId: userId,
      },
    });
    const totalCompletedTask = await Tasks.count({
      where: {
        userId: userId,
        completed: true,
      },
    });

    const totalPendingTask = await Tasks.count({
      where: { userId: userId, completed: false },
    });

    const todayTaskCount = await Tasks.count({
      where: {
        userId: userId,
        dateTime: {
          [Op.between]: [startOfToday, endOfToday],
        },
      },
    });

    const todayCompletedTaskCount = await Tasks.count({
      where: {
        userId: userId,
        dateTime: {
          [Op.between]: [startOfToday, endOfToday],
        },
        completed: true,
      },
    });

    const todayPendingTaskCount = await Tasks.count({
      where: {
        userId: userId,
        dateTime: {
          [Op.between]: [startOfToday, endOfToday],
        },
        completed: false,
      },
    });

    const recentTask = await Tasks.findAll({
      where: {
        userId: userId,
      },
      order: [["createdAt", "DESC"]],
      limit: 10,
    });

    return {
      totalTaskCount,
      totalCompletedTask,
      totalPendingTask,
      todayTaskCount,
      todayCompletedTaskCount,
      todayPendingTaskCount,
      recentTask,
    };
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getDashboardData,
};

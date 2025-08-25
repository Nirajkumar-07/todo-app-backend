const dashboardServices = require("../services/dashboard.service");

async function getDashboardData(req, res) {
  const user = req.user;
  try {
    const {
      todayCompletedTaskCount,
      todayPendingTaskCount,
      recentTask,
      todayTaskCount,
      totalCompletedTask,
      totalPendingTask,
      totalTaskCount,
    } = await dashboardServices.getDashboardData(user.dataValues.userId);
    return res.status(200).json({
      status: 200,
      success: true,
      data: {
        total_task: totalTaskCount,
        total_pending_task: totalPendingTask,
        total_comleted_task: totalCompletedTask,
        total_today_task: todayTaskCount,
        total_today_completed_task: todayCompletedTaskCount,
        total_today_pending_task: todayPendingTaskCount,
        recent_task_list: recentTask,
      },
      message: "dashboarddata fetched...",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      status: 404,
      data: null,
      message: JSON.stringify(error),
    });
  }
}

module.exports = { getDashboardData };

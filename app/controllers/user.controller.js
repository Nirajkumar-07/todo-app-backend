const userService = require("../services/user.service");

async function getUser(req, res) {
  try {
    const userId = req.params.userId;
    const user = req.user;
    const { password, ...userData } = user.dataValues;
    // const user = await userService.getUser(userId);
    if (user) {
      return res.status(200).json({
        status: 200,
        success: true,
        data: userData,
        message: "User found",
      });
    } else {
      return res.status(404).json({
        status: 404,
        success: false,
        data: null,
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: 404,
      success: false,
      data: null,
      message: error,
    });
  }
}

async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const user = req.user;

    if (user.dataValues.password !== currentPassword) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Current password mismatch",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "New password and confirm password mismatch",
      });
    }
    const changePasswordUser = await userService.changePassword(
      user.userId,
      newPassword
    );
    return res.status(200).json({
      status: 200,
      success: true,
      message: "User password changed",
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: error,
    });
  }
}

module.exports = { getUser, changePassword };

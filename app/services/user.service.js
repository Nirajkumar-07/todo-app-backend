const { Users } = require("../models");

async function getUser(userId) {
  try {
    const user = await Users.findByPk(userId);
    const { password, ...userData } = user;
    return userData;
  } catch (error) {
    throw new Error(error);
  }
}

async function changePassword(userId, newPassword) {
  try {
    const user = await Users.findByPk(userId);
    const changePasswordUser = await user.update({ password: newPassword });
    return changePasswordUser;
  } catch (error) {
    throw new Error(error);
  }
}

async function imageUpload(userId, imageName) {
  try {
    const user = await Users.findByPk(userId);
    const updateUserImage = await user.update({ image: imageName });
    return updateUserImage;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { getUser, changePassword, imageUpload };

const userService = require("../services/user.service");
const path = require("path");
const sharp = require("sharp");
const supabse = require("../config/supabase.config");

async function getUser(req, res) {
  try {
    const userId = req.params.userId;
    const user = req.user;
    const { password, ...userData } = user.dataValues;
    if (user) {
      const imageUrl = user.dataValues.image
        ? `${req.protocol}://${req.get("host")}/api/uploads/${
            user.dataValues.image
          }`
        : null;
      return res.status(200).json({
        status: 200,
        success: true,
        data: { ...userData, image: imageUrl },
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
      message: JSON.stringify(error),
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
      message: JSON.stringify(error),
    });
  }
}

async function imageUpload(req, res) {
  try {
    const filename = req.file ? Date.now() + "-" + req.file.originalname : null;
    const userId = req.user.userId;

    if (!filename) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Please upload an image.",
      });
    }

    const compressedBuffer = await sharp(req.file.buffer)
      .resize(800, 800, { fit: "inside" })
      .jpeg({ quality: 80 })
      .toBuffer();

    const { error: uploadError } = await supabse.storage
      .from("Uploads")
      .upload(filename, compressedBuffer, {
        contentType: req.file.minetype,
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const updatedUserImage = await userService.imageUpload(userId, filename);
    const imageUrl = updatedUserImage.dataValues.image
      ? `${req.protocol}://${req.get("host")}/api/uploads/${
          updatedUserImage.dataValues.image
        }`
      : null;

    return res.status(200).json({
      status: 200,
      success: true,
      message: "User image updated",
      data: { image: imageUrl },
    });
  } catch (error) {
    console.log("image err =>", error);
    return res.status(404).json({
      status: 404,
      success: false,
      message: JSON.stringify(error),
    });
  }
}

module.exports = { getUser, changePassword, imageUpload };

const { Users } = require("../models");
const jwt = require("jsonwebtoken");

async function signup(req, res) {
  const body = req.body;
  const { username, email, password } = body;
  try {
    const user = await Users.create({
      username,
      email,
      password,
    });
    return res.status(201).json("user registered");
  } catch (error) {
    console.log("signup error =>", error);
    if (error.original.code === "23505")
      return res.status(404).json({
        status: 404,
        success: false,
        message: "user already exists",
      });
    else {
      return res.status(404).json({
        status: 404,
        success: false,
        message: error.original.detail,
      });
    }
  }
}

async function signin(req, res) {
  const body = req.body;
  const { email, password } = body;

  try {
    const user = await Users.findOne({
      where: { email: email, password: password },
    });
    if (user) {
      const jwtToken = jwt.sign(
        {
          userId: user.userId,
          email: user.email,
        },
        process.env.AUTH_SECRET,
        { expiresIn: 60 * 60 }
      );

      const { password, ...userData } = user.dataValues;

      return res.status(200).json({
        status: 200,
        success: true,
        message: "successfully logged in",
        user: {
          ...userData,
          token: jwtToken,
        },
        token: jwtToken,
      });
    } else {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "invalid credentials",
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: 404,
      success: false,
      message: error,
      user: null,
    });
  }
}

module.exports = { signup, signin };

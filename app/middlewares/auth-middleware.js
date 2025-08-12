const { Users } = require("../models");
const jwt = require("jsonwebtoken");

async function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer "))
    return res.status(401).json("unauthorized");
  const authToken = token.split(" ")[1];
  try {
    const verified = jwt.verify(authToken, process.env.AUTH_SECRET);
    const user = await Users.findByPk(verified.userId);
    if (!user) return res.status(401).json("unauthorized");
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json("unauthorized");
  }
}

module.exports = authenticate;

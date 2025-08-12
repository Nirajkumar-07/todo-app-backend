const { sequelize } = require("../models");
const { Client } = require("pg");
const checkDBExistance = require("./checkdbExistance");

async function dbConnection() {
  try {
    await checkDBExistance();
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (error) {
    console.log("connection err =>", error);
  }
}

module.exports = dbConnection;

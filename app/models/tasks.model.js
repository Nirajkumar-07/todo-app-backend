const sequelize = require("../config/db.config");
const { DataTypes } = require("sequelize");
const Users = require("./users.model");

const Tasks = sequelize.define(
  "tasks",
  {
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = Tasks;

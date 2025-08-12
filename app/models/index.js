const sequelize = require("../config/db.config");
const Users = require("./users.model");
const Tasks = require("./tasks.model");

Users.hasMany(Tasks, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});

Tasks.belongsTo(Users, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});

module.exports = {
  sequelize,
  Users,
  Tasks,
};

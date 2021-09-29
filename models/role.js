const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../databases/db");

const Role = db.define(
  "roles",
  {
    name: {
      type: DataTypes.STRING,
    },
    level: {
      type: DataTypes.INTEGER,
    },
  },
  { freezeTableName: true }
);

module.exports = Role;

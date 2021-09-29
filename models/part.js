const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../databases/db");

const Part = db.define(
  "parts",
  {
    name: {
      type: DataTypes.STRING,
    }
  },
  { freezeTableName: true }
);

module.exports = Part;
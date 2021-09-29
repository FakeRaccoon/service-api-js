const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../databases/db");

const Token = db.define(
  "tokens",
  {
    token: {
      type: DataTypes.STRING,
    }
  },
  { freezeTableName: true }
);

module.exports = Token;

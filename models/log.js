const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../databases/db");

const Log = db.define(
  "logs",
  {
    user_id: {
      type: DataTypes.INTEGER,
    },
    log: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  },
  { freezeTableName: true }
);

module.exports = Log;

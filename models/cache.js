const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../databases/db");

const Cache = db.define(
  "caches",
  {
    etag: {
      type: DataTypes.STRING,
    }
  },
  { freezeTableName: true }
);

module.exports = Cache;

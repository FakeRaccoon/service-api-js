const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../databases/db");

const Item = db.define(
  "items",
  {
    atana_id: {
      type: DataTypes.INTEGER,
    },
    item_code: {
      type: DataTypes.STRING,
    },
    item_name: {
      type: DataTypes.STRING,
    },
    item_alias: {
      type: DataTypes.STRING,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  { freezeTableName: true }
);

module.exports = Item;

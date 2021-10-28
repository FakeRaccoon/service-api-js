const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../databases/db");

const Order = db.define(
  "orders",
  {
    item_id: {
      type: DataTypes.INTEGER
    },
    problem: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    condition: {
      type: DataTypes.STRING
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estimated_date: {
      type: DataTypes.DATE,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  { freezeTableName: true }
);

module.exports = Order;

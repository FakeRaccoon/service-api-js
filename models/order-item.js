const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../databases/db");

const OrderItem = db.define(
  "order_items",
  {
    qty: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true }
);

module.exports = OrderItem;
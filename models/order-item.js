const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../databases/db");

const OrderItem = db.define(
  "order_items",
  {
    order_id: {
      type: DataTypes.INTEGER,
    },
    item_id: {
      type: DataTypes.INTEGER,
    },
    qty: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  { freezeTableName: true }
);

module.exports = OrderItem;

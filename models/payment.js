const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../databases/db");

const Payment = db.define(
  "payments",
  {
    order_id: {
      type: DataTypes.INTEGER
    },
    repair_fee: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dp: {
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true }
);

module.exports = Payment;

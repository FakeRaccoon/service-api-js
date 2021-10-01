const { Sequelize } = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../databases/db");

const Payment = db.define(
  "payments",
  {
    reapair_fee: {
      type: DataTypes.INTEGER,
    },
    dp: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true }
);

module.exports = Payment;

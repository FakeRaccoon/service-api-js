const { Sequelize } = require("sequelize");
const dbConfig = require("./db-config");

const connection = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: "mysql",
    define: { timestamps: false },
  }
);

module.exports = connection;

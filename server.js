const formData = require('express-form-data')
const express = require("express");
const connection = require("./databases/db");
const route = require('./routes/routes');
// require('./cron-job');
const cors = require('cors')
require('dotenv').config()

const app = express();

app.use(formData.parse())
app.use(cors())
app.use(express.json());
app.use( express.urlencoded({ extended: true }));
app.use(route)

app.get("/", (req, res) => {
    res.send("Service API");
});

async function connect() {
  try {
    await connection.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

connect();

// cron.start();

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
